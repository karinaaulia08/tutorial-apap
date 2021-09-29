package apap.tutorial.cineplux.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class BaseController {

    @GetMapping("/")
    private String home(
            Model model
    ) {
        model.addAttribute("page", 0);
        return "home";
    }
}
