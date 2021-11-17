package apap.tutorial.cineplux.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @RequestMapping("/")
    public String home(Model model){
        model.addAttribute("page", 0);
        return "home";
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }
}
