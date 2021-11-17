package apap.tutorial.cineplux.repository;

import apap.tutorial.cineplux.model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleDB extends JpaRepository<RoleModel, Long>{
    List<RoleModel> findByRole(String role);
}
