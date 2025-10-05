import React from "react";
import { Newspaper, Calendar } from "lucide-react";

const News = () => {
  const newsList = [
    {
      id: 1,
      title: "Khai trương không gian đọc mới",
      desc: "Thư viện vừa khai trương khu vực đọc sách yên tĩnh với 200 chỗ ngồi.",
      date: "15/09/2025",
    },
    {
      id: 2,
      title: "Hội thảo nghiên cứu AI",
      desc: "Sự kiện thu hút hơn 300 sinh viên và giảng viên quan tâm đến trí tuệ nhân tạo.",
      date: "10/09/2025",
    },
    {
      id: 3,
      title: "Thêm 1000 đầu sách mới",
      desc: "Kho sách của thư viện vừa được cập nhật thêm nhiều sách học thuật và tham khảo.",
      date: "05/09/2025",
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">
        <Newspaper size={22} /> Tin tức - Sự kiện
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {newsList.map((news) => (
          <div key={news.id} className="card-custom">
            <h5 className="card-title">{news.title}</h5>
            <p className="card-text">{news.desc}</p>
            <p className="text-sm text-gray-500">
              {" "}
              <Calendar size={16} />
              {news.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
