package apap.tutorial.cineplux.service;

import apap.tutorial.cineplux.model.BioskopModel;

import java.util.List;

public interface BioskopService {
    //Method untuk menambah Bioskop
    void addBioskop(BioskopModel bioskop);

    //Method untuk mendapatkan daftar Bioskop yang telah tersimpan
    List<BioskopModel> getBioskopList();

    //Method untuk mendapatkan data sebuah bioskop berdasarkan id bioskop
    BioskopModel getBioskopByIdBioskop(String idBioskop);

    //Method untuk mengupdate data jumlah bioskop berdasarkan id bioskop
    void updateBioskopByIdBioskop(String idBioskop, int jumlahStudio);

    //Method untuk menghapus data bioskop berdasarkan id bioskop
    void deleteBioskopByIdBioskop(String idBioskop);
}
