package com.ufro.springgames.controller;

import com.ufro.springgames.models.Game;
import com.ufro.springgames.models.Player;
import com.ufro.springgames.services.GameService;
import com.ufro.springgames.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("game")
public class GameController {

    private final GameService gameService;
    private final PlayerService playerService;

    @Autowired
    public GameController(GameService gameService, PlayerService playerService) {
        this.gameService = gameService;
        this.playerService = playerService;
    }

    @GetMapping("slotmachine")
    public String startGame(Model model) {
        Player player = playerService.findById(1);
        model.addAttribute("player", player);
        return "slotmachine";
    }

    @GetMapping("/slotmachine/finish")
    @ResponseBody
    public String finishTragamonedas(
            @RequestParam("playerId") int playerId,
            @RequestParam("gameId") int gameId,
            @RequestParam("score") int score,
            @RequestParam("attempts") int attempts) {

        Player player = this.getPlayerById(playerId);
        Game game = this.getGameById(gameId);

        System.out.println(playerId);
        System.out.println(gameId);
        System.out.println(score);
        System.out.println(attempts);

        gameService.insertScore(player, game, score, attempts);

        return "Tragamonedas finalizado. Puntuación registrada.";
    }

    private Player getPlayerById(int playerId) {
        return playerService.findById(playerId);
    }

    private Game getGameById(int gameId) {
        return gameService.findById(gameId);
    }
}
