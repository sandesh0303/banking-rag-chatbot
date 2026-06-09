package com.banking.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.banking.backend.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findByUserEmail(String userEmail);

}