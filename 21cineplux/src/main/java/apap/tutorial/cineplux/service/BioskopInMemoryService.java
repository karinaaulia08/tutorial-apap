package apap.tutorial.cineplux.service;

import apap.tutorial.cineplux.model.BioskopModel;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class BioskopInMemoryService implements BioskopService{

    private List<BioskopModel> listBioskop;

    //Constructor
    public BioskopInMemoryService() {
        listBioskop = new ArrayList<>();
    }

    @Override
    public void addBioskop(BioskopModel bioskop) {
        listBioskop.add(bioskop);
    }

    @Override
    public List<BioskopModel> getBioskopList() {
        return listBioskop;
    }

    @Override
    public BioskopModel getBioskopByIdBioskop(String idBioskop) {
        BioskopModel bioskopDicari = null;
        for (BioskopModel bioskop: listBioskop) {
            if (bioskop.getIdBioskop().equals(idBioskop)) {
                bioskopDicari = bioskop;
            }
        }
        return bioskopDicari;
    }
}
