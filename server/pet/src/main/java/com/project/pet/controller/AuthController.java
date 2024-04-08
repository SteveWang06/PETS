package com.project.pet.controller;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.models.User;
import com.project.pet.payload.response.LoginResponse;
//import com.project.pet.services.RefreshTokenService;
//import com.project.pet.services.UserDetailsImpl;
import com.project.pet.services.AuthService;
import com.project.pet.services.JwtService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("api/auth")
public class AuthController {

  private final JwtService jwtService;

  @Autowired
  private final AuthService authService;

//  @Autowired
//  private AuthenticationManager authenticationManager;
//  @Autowired
//  private JwtUtils jwtUtils;
//
//  @Autowired
//  private UserDetailsServiceImpl userDetailsService;
//
//  @Autowired
//  private UserRepository userRepository;
//
//  @Autowired
//  private RoleRepository roleRepository;


  public AuthController(JwtService jwtService, AuthService authService) {
    this.jwtService = jwtService;
    this.authService = authService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestParam("username") String username,
                                       @RequestParam("email") String email,
                                       @RequestParam("password") String password,
                                       @RequestParam("image") MultipartFile images) throws IOException {

//    if (userRepository.existsByUsername(signupDTO.getUsername())) {
//      return ResponseEntity
//          .badRequest()
//          .body(new MessageResponse("Error: Username is already taken!"));
//    }
//
//    if (userRepository.existsByEmail(signupDTO.getEmail())) {
//      return ResponseEntity
//          .badRequest()
//          .body(new MessageResponse("Error: Email is already in use!"));
//    }



    User registerUser = authService.createUser(username, email, password, images);
    return ResponseEntity.ok(registerUser);

//    User createdUser = authService.createUser(signupDTO);
//    Set<String> strRoles = signupDTO.getRoles();
//    Set<Role> roles = new HashSet<>();

//    if (strRoles == null) {
//      Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
//          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//      roles.add(userRole);
//    } else {
//      strRoles.forEach(role -> {
//        switch (role) {
//          case "admin":
//            Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN)
//                .orElseThrow(() -> new RuntimeException("Error: Role is not found1."));
//            roles.add(adminRole);
//
//            break;
//
//          default:
//            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
//                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//            roles.add(userRole);
//
//        }
//      });
//    }



    //return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }



  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginDto) {
    User authenticatedUser = authService.authenticate(loginDto);

    String jwtToken = jwtService.generateToken(authenticatedUser);

    String username = authenticatedUser.getUserName();
    Long userId = authenticatedUser.getId();
    LoginResponse loginResponse = new LoginResponse()
        .setToken(jwtToken)
        .setExpiresIn(jwtService.getExpirationTime())
        .setUserName(username)
        .setUserId(userId);

    return ResponseEntity.ok(loginResponse);
  }





//  @PostMapping("/login")
//  public AuthenticationResponse createAuthenticationToken(@RequestBody LoginDto authenticationDTO, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
//    try {
//      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword()));
//    } catch (BadCredentialsException e) {
//      throw new BadCredentialsException("Incorrect username or password!");
//    } catch (DisabledException disabledException) {
//      response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not activated");
//      return null;
//    }
//
//    final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTO.getEmail());
//
//
//    final String jwt = jwtUtils.generateToken(userDetails.getUsername());
//
//
//    return new AuthenticationResponse(jwt);
//
//  }


}





























