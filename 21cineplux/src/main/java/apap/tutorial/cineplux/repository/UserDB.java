package apap.tutorial.cineplux.repository;

import apap.tutorial.cineplux.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDB extends JpaRepository<UserModel, Long> {
    UserModel findByUsername(String username);
}
