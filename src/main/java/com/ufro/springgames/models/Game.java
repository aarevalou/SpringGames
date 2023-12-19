package com.ufro.springgames.models;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private int id;

    @Column(name = "game_name", nullable = false)
    private String gameName;
}
