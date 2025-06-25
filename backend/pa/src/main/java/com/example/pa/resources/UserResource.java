package com.example.pa.resources;

import com.example.pa.model.user.User;
import com.example.pa.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserResource {

    @Autowired
    UserService userService;

    @GetMapping("/porEmail")
    public ResponseEntity<User> findByEmail(@RequestParam @Valid String email) {
        User user = userService.findByEmail(email);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody @Valid User user) {
        User updatedUser = userService.update(user);
        return ResponseEntity.ok().body(updatedUser);
    }
}
