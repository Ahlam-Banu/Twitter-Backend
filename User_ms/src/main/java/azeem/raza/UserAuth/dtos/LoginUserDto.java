package azeem.raza.UserAuth.dtos;

import lombok.Getter;
import lombok.Setter;

public class LoginUserDto {
   @Setter @Getter
    private String email;
    @Setter @Getter
    private String password;

    // getters and setters here...
}