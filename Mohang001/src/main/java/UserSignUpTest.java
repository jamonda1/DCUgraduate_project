import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class UserSignUpTest {
    public static void main(String[] args) {
        // DB 연결 정보
        String url = "jdbc:mysql://localhost:3306/mohang?serverTimezone=UTC";
        String user = "travel_user";
        String password = "test001"; //워크벤치 실행후 " "사이에 본인 워크벤치 비밀번호입력

        // 회원가입 데이터
        String nickname = "newUser3";
        String email = "newuser3@example.com";
        String hashedPassword = "$2y$10$abd123hashedpassword"; // 실제 bcrypt로 해싱된 비밀번호 사용
        String birth = "2010-03-12";
        String gender = "여";

        // SQL INSERT 문
        String sql = "INSERT INTO User (user_nickname, user_email, user_password, user_birth, user_gender, user_status) " +
                "VALUES (?, ?, ?, ?, ?, '활성')";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // 데이터 바인딩
            pstmt.setString(1, nickname);
            pstmt.setString(2, email);
            pstmt.setString(3, hashedPassword);
            pstmt.setString(4, birth);
            pstmt.setString(5, gender);

            // 실행 및 결과 확인
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("✅ 회원가입 성공");
            } else {
                System.out.println("❌ 회원가입 실패");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
