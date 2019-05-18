package com.example.filmwebdownloader;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private TextView mTextMessage;
    private DatabaseReference mDatabase;
    private ArrayList<Film> films = new ArrayList<>();


    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    mTextMessage.setText(R.string.title_home);
                    return true;
                case R.id.navigation_dashboard:
                    mTextMessage.setText(R.string.title_dashboard);
                    return true;
                case R.id.navigation_notifications:
                    mTextMessage.setText(R.string.title_notifications);
                    return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextMessage = (TextView) findViewById(R.id.message);
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

        mDatabase = FirebaseDatabase.getInstance().getReference();
    }

    public void onClickDownloadFilms(View view) throws IOException {
        FilmsDownloader fd = new FilmsDownloader();
        films = fd.getFilms();
        films = fd.transformData(films);

        Context context = getApplicationContext();
        Toast toast = Toast.makeText(context, "liczba filmów: "+films.size(), Toast.LENGTH_LONG);
        toast.show();

    }

    public void onClickAddFilmsToDatabase(View view) {
        Context context = getApplicationContext();
        Toast toast = Toast.makeText(context, "liczba filmów w cache: "+films.size(), Toast.LENGTH_LONG);
        toast.show();
        for(int i=0; i<films.size(); i++){
            String key = mDatabase.child("films").push().getKey();
            Map<String, Object> filmValues = films.get(i).toMap();
            Map<String, Object> childUpdates = new HashMap<>();
            childUpdates.put("/films/" + key, filmValues);
            mDatabase.updateChildren(childUpdates);
        }
    }
}
