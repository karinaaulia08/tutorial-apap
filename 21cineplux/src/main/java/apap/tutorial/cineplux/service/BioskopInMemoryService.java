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
    public void updateBioskop(BioskopModel bioskop) {
    }

    @Override
    public void deleteBioskop(BioskopModel bioskop) {
    }

    @Override
    public List<BioskopModel> getBioskopList() {
        return listBioskop;
    }

    @Override
    public BioskopModel getBioskopByNoBioskop(Long noBioskop) {
        return null;
    }

//    @Override
//    public BioskopModel getBioskopByIdBioskop(String idBioskop) {
//        BioskopModel bioskopDicari = null;
//        for (BioskopModel bioskop: listBioskop) {
//            if (bioskop.getIdBioskop().equals(idBioskop)) {
//                bioskopDicari = bioskop;
//            }
//        }
//        return bioskopDicari;
//    }
//
//    @Override
//    public void updateBioskopByIdBioskop(String idBioskop, int jumlahStudio) {
//        getBioskopByIdBioskop(idBioskop).setJumlahStudio(jumlahStudio);
//    }
//
//    @Override
//    public void deleteBioskopByIdBioskop(String idBioskop) {
//        listBioskop.remove(getBioskopByIdBioskop(idBioskop));
//    }

}
