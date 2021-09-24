package apap.tutorial.cineplux.controller;

import apap.tutorial.cineplux.model.BioskopModel;
import apap.tutorial.cineplux.model.PenjagaModel;
import apap.tutorial.cineplux.service.BioskopService;
import apap.tutorial.cineplux.service.PenjagaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@Controller
public class PenjagaController {
    @Qualifier("penjagaServiceImpl")
    @Autowired
    private PenjagaService penjagaService;

    @Qualifier("bioskopServiceImpl")
    @Autowired
    private BioskopService bioskopService;

    @GetMapping("/penjaga/add/{noBioskop}")
    public String addPenjagaForm(
            @PathVariable Long noBioskop,
            Model model
    ) {
        PenjagaModel penjaga = new PenjagaModel();
        BioskopModel bioskop = bioskopService.getBioskopByNoBioskop(noBioskop);
        penjaga.setBioskop(bioskop);
        model.addAttribute("penjaga", penjaga);
        return "form-add-penjaga";
    }

    @PostMapping("/penjaga/add")
    public String addPenjagaSubmit(
            @ModelAttribute PenjagaModel penjaga,
            Model model
    ) {
        penjagaService.addPenjaga(penjaga);
        model.addAttribute("noBioskop", penjaga.getBioskop().getNoBioskop());
        model.addAttribute("namaPenjaga", penjaga.getNamaPenjaga());
        return "add-penjaga";
    }

    @GetMapping("/penjaga/update/{noPenjaga}")
    public String updatePenjagaForm(
            @PathVariable Long noPenjaga,
            Model model
    ) {
        PenjagaModel penjaga = penjagaService.getPenjagaByNoPenjaga(noPenjaga);
        if (penjaga == null) {
            return "error-penjaga";
        }
        model.addAttribute("penjaga", penjaga);
        model.addAttribute("bioskop", penjaga.getBioskop());
        return "form-update-penjaga";
    }

    @PostMapping("/penjaga/update")
    public String updatePenjagaSubmit(
            @ModelAttribute PenjagaModel penjaga,
            Model model
    ) {
        if(penjagaService.getPenjagaByNamaPenjaga(penjaga.getNamaPenjaga()) == null) {
            penjagaService.updatePenjaga(penjaga);
            model.addAttribute("noPenjaga", penjaga.getNoPenjaga());
            model.addAttribute("noBioskop", penjaga.getBioskop().getNoBioskop());
            return "update-penjaga";
        } else {
            return "error-update-penjaga";
        }
    }

    @GetMapping("/penjaga/delete/{noPenjaga}")
    public String deletePenjaga(
            @PathVariable(value = "noPenjaga") Long noPenjaga,
            Model model
    ) {
        PenjagaModel penjaga = penjagaService.getPenjagaByNoPenjaga(noPenjaga);
        String namaPenjaga = "";
        Long noBioskop = null;
        String message = " ";
        if (penjaga == null) {
            message = "penjaga dengan id " + noPenjaga + " tidak ditemukan";
        } else {
            namaPenjaga = penjaga.getNamaPenjaga();
            noBioskop = penjaga.getBioskop().getNoBioskop();
            penjagaService.deletePenjaga(penjaga);
            message = "Bioskop dengan nomor bioskop " + noBioskop + " berhasil menghapus " + namaPenjaga + " sebagai penjaga";
        }
        model.addAttribute("noBioskop", noBioskop);
        model.addAttribute("namaPenjaga", namaPenjaga);
        model.addAttribute("message", message);
        return "delete-penjaga";
    }

}
