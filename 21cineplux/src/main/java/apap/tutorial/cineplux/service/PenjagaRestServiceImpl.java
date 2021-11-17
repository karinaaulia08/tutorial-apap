package apap.tutorial.cineplux.service;

import apap.tutorial.cineplux.model.BioskopModel;
import apap.tutorial.cineplux.model.PenjagaModel;
import apap.tutorial.cineplux.repository.BioskopDB;
import apap.tutorial.cineplux.repository.PenjagaDB;
import apap.tutorial.cineplux.rest.BioskopDetail;
import apap.tutorial.cineplux.rest.Setting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class PenjagaRestServiceImpl implements PenjagaRestService {
    private final WebClient webClient;
    @Autowired
    private PenjagaDB penjagaDB;

    public PenjagaRestServiceImpl(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl(Setting.umurPenjagaUrl).build();
    }

    @Override
    public PenjagaModel getUmur(Long noPenjaga) {
        String namaPenjaga[] = getPenjagaByNoPenjaga(noPenjaga).getNamaPenjaga().split(" ",2);

//        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        Mono<String> data = this.webClient.get().uri("/?name=" + namaPenjaga[0])
                .retrieve()
                .bodyToMono(String.class);
        String atribut[] = data.share().block().split(",");
        String hasil[] = atribut[1].split(":");
        PenjagaModel penjaga = getPenjagaByNoPenjaga(noPenjaga);
        penjaga.setUmur(Integer.valueOf(hasil[1]));
        penjagaDB.save(penjaga);
        return penjaga;
    }

    @Override
    public PenjagaModel createPenjaga(PenjagaModel penjaga) {
        return penjagaDB.save(penjaga);
    }

    @Override
    public List<PenjagaModel> retrieveListPenjaga() {
        return penjagaDB.findAll();
    }

    @Override
    public PenjagaModel getPenjagaByNoPenjaga(Long noPenjaga) {
        Optional<PenjagaModel> penjaga = penjagaDB.findByNoPenjaga(noPenjaga);

        if(penjaga.isPresent()){
            return penjaga.get();
        }else{
            throw new NoSuchElementException();
        }
    }

    @Override
    public PenjagaModel updatePenjaga(Long noPenjaga, PenjagaModel penjagaUpdate) {
        PenjagaModel penjaga = getPenjagaByNoPenjaga(noPenjaga);
        penjaga.setNamaPenjaga(penjagaUpdate.getNamaPenjaga());
        penjaga.setJenisKelamin(penjaga.getJenisKelamin());

        return penjagaDB.save(penjaga);
    }

    @Override
    public void deletePenjaga(Long noPenjaga) {
        LocalTime now = LocalTime.now();
        PenjagaModel penjaga = getPenjagaByNoPenjaga(noPenjaga);

        BioskopModel bioskop = penjaga.getBioskop();

        if((now.isBefore(bioskop.getWaktuBuka()) || now.isAfter(bioskop.getWaktuTutup()))) {
            penjagaDB.delete(penjaga);
        }else{
            throw new UnsupportedOperationException("Bioskop still open!");
        }
    }
}
