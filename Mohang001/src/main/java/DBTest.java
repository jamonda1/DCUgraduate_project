import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBTest {
    public static void main(String[] args) {
        // DB 연결 정보
        String url = "jdbc:mysql://localhost:3306/mohang?serverTimezone=UTC";
        String user = "travel_user";
        String password = "test001"; //워크벤치 실행후 " "사이에 본인 워크벤치 비밀번호입력

        try {
            // MySQL 연결
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("✅ MySQL 연결 성공");

            // SQL 실행
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM User");

            // 결과 출력
            while (rs.next()) {
                System.out.println("👤 사용자: " + rs.getString("user_nickname") + " | 이메일: " + rs.getString("user_email"));
            }

            // 연결 종료
            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
