package com.ufro.springgames.services;

import com.ufro.springgames.models.Player;
import com.ufro.springgames.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player findByUsername(String username) {
        return playerRepository.findByUsername(username);
    }

    public Player save(Player player) {
        return playerRepository.save(player);
    }

    public Player findById(int id) {
        return playerRepository.findById(id);
    }

    public void deleteById(int id) {
        playerRepository.deleteById(id);
    }
}
