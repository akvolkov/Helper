package app.servlets;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class HelperServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        PrintWriter writer = resp.getWriter();
//        writer.println("My Helper");
        //открываем Html страницу Helper
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("helper/indexHelper.html");
        requestDispatcher.forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //получаем переданные данные
        String name = req.getParameter("name");
        String text = req.getParameter("text");
        String filePath = req.getParameter("path");
        System.out.println("filePath = " + filePath);
        switch (filePath) {
            case "build":
                filePath = "C://myProject/myWebApp4/web/helper/data/build.json";
                break;
            case "bifit":
                filePath = "C://myProject/myWebApp4/web/helper/data/bifit.json";
                break;
            case "inet":
                filePath = "C://myProject/myWebApp4/web/helper/data/inet.json";
                break;
            case "other":
                filePath = "C://myProject/myWebApp4/web/helper/data/other.json";
                break;
            default:
                System.out.println("хулу дули");
        }
        JSONObject jsonObject = null;
        JSONParser jsonParser = new JSONParser();
        //чтение из файла
        try (FileReader reader = new FileReader(filePath)){
            jsonObject = (JSONObject) jsonParser.parse(reader);
            jsonObject.put(name, text);
        } catch (ParseException e) {
            e.printStackTrace();
        }
//        //запись в файл
        try(FileWriter writer = new FileWriter(filePath)){
          writer.write(jsonObject.toJSONString());
        }
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("helper/indexHelper.html");
        requestDispatcher.forward(req, resp);
    }
}
