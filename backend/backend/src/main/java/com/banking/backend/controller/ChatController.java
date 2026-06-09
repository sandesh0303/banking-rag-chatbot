package com.banking.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.banking.backend.entity.Chat;
import com.banking.backend.model.ChatRequest;
import com.banking.backend.model.ChatResponse;
import com.banking.backend.repository.ChatRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatRepository chatRepository;

    public ChatController(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {

        try {

            RestTemplate restTemplate = new RestTemplate();

            Map<String, String> body = new HashMap<>();
            body.put("question", request.getQuestion());

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            "http://127.0.0.1:8000/ask",
                            body,
                            Map.class);

            String answer =
                    response.getBody().get("answer").toString();

            // Save Chat History
            Chat chat = new Chat();
            chat.setQuestion(request.getQuestion());
            chat.setAnswer(answer);
            chat.setUserEmail(request.getEmail());

            chatRepository.save(chat);

            return new ChatResponse(answer);

        } catch (Exception e) {

            e.printStackTrace();
            return new ChatResponse(
                    "Error: " + e.getMessage()
            );
        }
    }
}