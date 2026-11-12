// All invitation content lives here. Edit these values to update the page.

export const invitation = {
  baby: {
    name: "김채이",
    firstName: "채이",
    englishName: "Chae-i",
  },
  parents: {
    father: "김재헌",
    mother: "김소현",
  },
  // 2027년 1월 24일 (일) 오전 11시, 한국 시간
  eventDate: "2027-01-24T11:00:00+09:00",
  dateLabel: "2027년 1월 24일 일요일 오전 11시",
  dateShort: "2027. 01. 24. SUN 11:00 AM",
  venue: {
    name: "포포인츠 바이 쉐라톤 서울 구로",
    hall: "PDR AB룸",
    address: "서울 구로구 디지털로32길 72",
    tel: "02-6905-9500",
    subway: "2호선 구로디지털단지역 2번 출구 도보 약 3분",
    parking: "호텔 지하 주차장 이용 가능",
    naverMap: "https://map.naver.com/p/search/" + encodeURIComponent("포포인츠 바이 쉐라톤 서울 구로"),
    kakaoMap: "https://map.kakao.com/link/search/" + encodeURIComponent("포포인츠바이쉐라톤서울구로"),
    googleEmbed:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("포포인츠 바이 쉐라톤 서울 구로") +
      "&output=embed",
  },
  // 사진을 넣으려면 public/images 폴더에 파일을 넣고 경로를 적어주세요. 예: "/images/main.jpg"
  photos: {
    main: "",
    gallery: ["", "", "", "", "", ""],
  },
} as const;
