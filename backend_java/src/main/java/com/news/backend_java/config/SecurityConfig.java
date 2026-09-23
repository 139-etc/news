package com.news.backend_java.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.boot.CommandLineRunner;

import com.news.backend_java.repository.UserAccountRepository;
import com.news.backend_java.security.JwtAuthenticationFilter;

import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
         // CORSを有効化
        .cors(Customizer.withDefaults())
        // CSRFを無効化
        .csrf(csrf -> csrf.disable())
        // Spring Bootの標準ログイン画面を非表示        
        .formLogin(form -> form.disable()) 
        // ブラウザのID/パスワード入力ダイアログを不使用
        .httpBasic(httpBasic -> httpBasic.disable())
        // H2コンソール使用のためiframe有効化
        .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
        // 誰がアクセスできるかを決定
        .authorizeHttpRequests(auth -> auth
            // /api/request(設定したAPIのリンク)からを全許可
            .requestMatchers(HttpMethod.POST, "/api/request/*").permitAll()
            // /api/response(設定したAPIのリンク)からを全許可
            .requestMatchers(HttpMethod.GET, "/api/response/*").permitAll()
            // /api/auth(認証用リンク)からを全許可
            .requestMatchers(HttpMethod.POST, "/api/auth/*").permitAll()
            // 現在H2DBを使用しているので全許可
            .requestMatchers("/h2-console/**").permitAll()
            // その他は認証必須＝JWTがないとアクセス不可
            .anyRequest().authenticated()
        );

    // Spring標準の認証より先にJWTを確認
    http.addFilterBefore(
    jwtAuthenticationFilter,
    UsernamePasswordAuthenticationFilter.class);

    // JSESSIONIDを発行しないしセッションを作らない
    http
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    // Next.jsとの通信を許可(ローカル環境なので後で変更)
    config.setAllowedOrigins(List.of("http://127.0.0.1:3000"));
    // 許可しているHTTPメソッドは以下5種
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    // すべてのヘッダーを許可
    config.setAllowedHeaders(List.of("*"));
    // Cookie送信を許可
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    CommandLineRunner init(UserAccountRepository repository, PasswordEncoder encoder) {
    
        // 初期設定
        return args -> {
        // 管理者ユーザの設定をする
        if (repository.findByUserId("system@co.jp") == null) {
            repository.insertUser(
                "system@co.jp",
                encoder.encode("P@ssw0rd"),
                "ROLE_ADMIN"
            );
        }
    };
    }
}
