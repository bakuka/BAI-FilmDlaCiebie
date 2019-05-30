package com.example.filmwebdownloader;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.*;


public class FilmsDownloader {

    private static final String ALLFILMSLINK = "https://www.filmweb.pl/films/search?orderBy=popularity&descending=true&page=";


    public ArrayList<Film> getFilms(int count) throws IOException {
        try {
            ExecutorService exec = Executors.newFixedThreadPool(90);
            ArrayList<Future<ArrayList<Film>>> call_list=  new ArrayList<Future<ArrayList<Film>>>();
            for(int i =1;i<=10;i++) {
                call_list.add(exec.submit(new AllFilmsThread(ALLFILMSLINK + (i*count))));
            }

            ArrayList<Film> filmsList = new ArrayList<Film>();
            for(Future<ArrayList<Film>> str:call_list){
                try{
                    filmsList.addAll(str.get());
                }catch(InterruptedException e){
                    System.out.println(e);
                }catch(ExecutionException e){
                    System.out.println(e);
                }finally {
                    exec.shutdown();
                }
            }
            return filmsList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static ArrayList<Film> getFilmsFromPage(Document doc){

        try {
            Elements fbFilms = doc.getElementsByClass("hits__item");
            ArrayList<Film> filmsList = new ArrayList<Film>();

            for (Element filmCategory : fbFilms) {
                Film filmObject = new Film();
                ArrayList<String> filmsGenres = new ArrayList<String>();
                ArrayList<String> filmsCountries = new ArrayList<String>();
                ArrayList<String> filmsDirectors = new ArrayList<String>();
                ArrayList<String> filmsActors = new ArrayList<String>();

                filmObject.setTittle(filmCategory.select(".filmPreview__title").html()); //film tittle
                if (filmObject.getTittle().equals("")){
                    /* if there is wrong film - position without information, there is no data
                        this film has to be skipped;
                     */
                    continue;
                }
                filmObject.setOriginalTittle(filmCategory.select(".filmPreview__originalTitle").html()); //film original tittle
                filmObject.setScore(filmCategory.select(".rateBox").attr("data-rate")); //film rate
                filmObject.setTime(filmCategory.select(".filmPreview__filmTime").attr("data-duration")); //film time
                try {
                    filmObject.setYear(filmCategory.select(".filmPreview").attr("data-release").substring(0, 4)); //film year
                }catch (StringIndexOutOfBoundsException e){
                    System.out.println("ERROR - wrong year released" + filmCategory.select(".filmPreview").html()) ; //film tittle);
                }
                filmObject.setId(filmCategory.select(".filmPreview").attr("data-id"));

                for (int i = 0; i < filmCategory.select(".filmPreview__info--genres ul li a").size() ; i++){
                    filmsGenres.add(filmCategory.select(".filmPreview__info--genres ul li a").get(i).html());
                }
                filmObject.setFilmGenres(filmsGenres); //film genres

                for (int i = 0; i < filmCategory.select(".filmPreview__info--countries ul li a").size() ; i++){
                    filmsCountries.add(filmCategory.select(".filmPreview__info--countries ul li a").get(i).html());
                }
                filmObject.setFilmCountries(filmsCountries); //film country

                for (int i = 0; i < filmCategory.select(".filmPreview__info--directors ul li a").size() ; i++){
                    filmsDirectors.add(filmCategory.select(".filmPreview__info--directors ul li a").get(i).html());
                }
                filmObject.setFilmDirector(filmsDirectors); //film director

                for (int i = 0; i < filmCategory.select(".filmPreview__info--cast ul li a").size() ; i++){
                    filmsActors.add(filmCategory.select(".filmPreview__info--cast ul li a").get(i).html());
                }
                filmObject.setFilmActors(filmsActors); //film actors

                filmObject.setUrl("https://www.filmweb.pl" + filmCategory.select(".filmPreview__link").attr("href") + "/discussion?plusMinus=false&page=");
                filmObject.setImgURL(filmCategory.select(".filmPoster__image").attr("data-src"));
                filmsList.add(filmObject);
            }
            return filmsList;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<Film> transformData(ArrayList<Film> films){


        for (int i=0; i<films.size(); i++){
            /*rouding the score*/
            try {
                films.get(i).setScore(films.get(i).getScore().substring(0, 4));
            }catch (NullPointerException e){
                films.remove(i);
                e.printStackTrace();
            }catch (NumberFormatException e){
                films.remove(i);
                e.printStackTrace();
            }catch (StringIndexOutOfBoundsException e){
                films.remove(i);
                e.printStackTrace();
            }
        }
        return films;
    }
}

class AllFilmsThread implements Callable {

    private String  url;
    private Elements el;
    private Document doc;

    AllFilmsThread(String link){
        this.url = link;
    }

    public ArrayList<Film> call() throws Exception {
        this.doc = Jsoup.connect(url ).get();
        this.el = Jsoup.connect(url).get().getElementsByClass("hits");
        ArrayList<Film> threadFilms = new ArrayList();
        threadFilms.addAll(FilmsDownloader.getFilmsFromPage(doc));
        return threadFilms;
    }
}

