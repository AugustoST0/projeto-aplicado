package com.example.pa.services;

import com.example.pa.model.user.User;
import com.example.pa.repositories.UserRepository;
import com.example.pa.services.exceptions.EmailAlreadyExistsException;
import com.example.pa.services.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User findById(String id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário encontrado com id: " + id));
    }

    public User findByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));
    }

    public User update(User user) {
        User existingUser = findById(user.getId());

        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            if (!u.getId().equals(user.getId())) {
                throw new EmailAlreadyExistsException("Email já está em uso");
            }
        });

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);
        } else {
            user.setPassword(existingUser.getPassword());
        }

        return userRepository.save(user);
    }

    public void deleteById(String id) {
        User existingUser = findById(id);
        userRepository.deleteById(id);
    }

}
