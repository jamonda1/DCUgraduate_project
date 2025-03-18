package com.example.logintest5;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sessionManager = new SessionManager(this);
        TextView textViewWelcome = findViewById(R.id.textViewWelcome);
        Button buttonLogout = findViewById(R.id.buttonLogout);

        textViewWelcome.setText("모행");

        buttonLogout.setOnClickListener(view -> {
            sessionManager.logout(); // ✅ 로그아웃 시 세션 초기화
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK); // 기존 액티비티 스택 삭제
            startActivity(intent);
        });
    }
}
