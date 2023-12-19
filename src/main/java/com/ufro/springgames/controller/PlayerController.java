package com.ufro.springgames.controller;

import com.ufro.springgames.models.Player;
import com.ufro.springgames.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/initialize")
    public ResponseEntity<Player> initializePlayer() {
        Player player = playerService.findById(1);
        return ResponseEntity.ok(player);
    }
}
