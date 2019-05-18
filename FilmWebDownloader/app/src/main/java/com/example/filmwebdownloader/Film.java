package com.example.filmwebdownloader;

import com.google.firebase.database.Exclude;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Film {
    private String tittle, url, score, time, originalTittle, year, id, imgURL;
    private ArrayList<String> filmGenres, filmCountries, filmDirector, filmActors;

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getScore() {
        return score;
    }

    public void setFilmGenres(ArrayList<String> filmGenres) {
        this.filmGenres = filmGenres;
    }

    public ArrayList<String> getFilmGenres() {
        return filmGenres;
    }

    public String getTittle() {
        return tittle;
    }

    public String getUrl() {
        return url;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }

    public void setOriginalTittle(String originalTittle) {
        this.originalTittle = originalTittle;
    }

    public String getOriginalTittle() {
        return originalTittle;
    }

    public void setFilmCountries(ArrayList<String> filmCountries) {
        this.filmCountries = filmCountries;
    }

    public ArrayList<String> getFilmCountries() {
        return filmCountries;
    }

    public void setFilmDirector(ArrayList<String> filmDirector) {
        this.filmDirector = filmDirector;
    }

    public void setFilmActors(ArrayList<String> filmActors) {
        this.filmActors = filmActors;
    }

    public ArrayList<String> getFilmDirector() {
        return filmDirector;
    }

    public ArrayList<String> getFilmActors() {
        return filmActors;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getYear() {
        return year;
    }

    public void setId(String id) {
        this.id = id;
    }
    public Film(){

    }

    public Film(String id, String tittle, String originalTittle, String score, String time, String year, ArrayList<String> genres, ArrayList<String> countries,
                String imgURL) {
        this.id = id;
        this.tittle = tittle;
        this.originalTittle = originalTittle;
        this.score = score;
        this.time = time;
        this.year = year;
        this.filmGenres = genres;
        this.filmCountries = countries;
        this.imgURL = imgURL;
    }

    public String getId() {
        return id;
    }

    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("id", id);
        result.put("tittle", tittle);
        result.put("originalTittle", originalTittle);
        result.put("score", score);
        result.put("time", time);
        result.put("year", year);
        result.put("genres", filmGenres);
        result.put("countries", filmCountries);
        result.put("imgURL", imgURL);

        return result;
    }
}
