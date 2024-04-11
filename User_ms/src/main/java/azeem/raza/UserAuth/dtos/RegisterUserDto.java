package azeem.raza.UserAuth.dtos;

import lombok.Getter;
import lombok.Setter;

public class RegisterUserDto {
    @Setter @Getter
    private String email;
    @Setter @Getter
    private String password;
    @Setter @Getter
    private String fullName;

}