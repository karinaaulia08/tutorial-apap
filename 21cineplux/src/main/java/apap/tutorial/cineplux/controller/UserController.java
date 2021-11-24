package apap.tutorial.cineplux.controller;

import apap.tutorial.cineplux.model.RoleModel;
import apap.tutorial.cineplux.model.UserModel;
import apap.tutorial.cineplux.service.RoleService;
import apap.tutorial.cineplux.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/add")
    private String addUserFormPage(Model model){
        UserModel user = new UserModel();
        List<RoleModel> listRole = roleService.getListRole();
        model.addAttribute("user", user);
        model.addAttribute("listRole", listRole);
        return "form-add-user";
    }

    @PostMapping(value = "/add")
    private String addUserSubmit(@ModelAttribute UserModel user, Model model) {
        userService.addUser(user);
        model.addAttribute("user", user);
        return "redirect:/";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/viewall")
    public String listUser(Model model) {
        List<UserModel> listUser = userService.getUserList();
        model.addAttribute("listUser", listUser);
        return "viewall-user";
    }

    @GetMapping("/delete/{username}")
    public String deleteUser(
            @PathVariable(value = "username") String username,
            Model model
    ) {
        UserModel user = userService.getUserByUsername(username);
        userService.deleteUser(user);
        return "delete-user";
    }

    @GetMapping("/changePassword")
    private String changePassword(Model model){
        UserModel user = new UserModel();
        model.addAttribute("user", user);
        model.addAttribute("message", "");
        return "form-change-password";
    }

    @PostMapping(value = "/changePassword")
    public String changePasswordSubmit(
            @ModelAttribute UserModel user,
            String newPassword,
            String configurePassword,
            Model model){

        UserModel user2 = userService.getUserByUsername(user.getUsername());

        if (userService.isPasswordMatch(user.getPassword(), user2.getPassword())){
            if (newPassword.equals(configurePassword)){
                userService.updatePassword(user2, newPassword);
                model.addAttribute("message", "Password berhasil diubah");
            }else {
                model.addAttribute("message", "Password baru dan password konfirmasi tidak sama");
            }
        }else {
            model.addAttribute("message", "Password lama salah");
        }
            return "form-change-password";
    }

}