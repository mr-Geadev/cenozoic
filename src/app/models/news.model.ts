class Comment {
  creationDate: string;
  userId: string;
  userName: string;
  text: string;
}

export class NewsModel {
  title: string = 'США свернули нефтедобычу в Мексиканском заливе';
  creationDate: string = '23 сен 2017';
  changeDate: string = '23 сен 2017';
  photoUrl: string = 'https://pp.userapi.com/c639517/v639517758/48ddb/xaCYWsf1shc.jpg';
  publicateToMainPage: boolean = true;
  publicateToNewsPage: boolean = true;
  text: string = 'МОСКВА, 1 окт — РИА Новости. Стоимость нефти марки Brent превысила 85 долларов за баррель впервые с 10 ноябр я 2014 года, свидетельствуют данные торгов.\n' + 'По состоянию на 21.40 мск декабрьские фьючрсы на североморскую смесь росли на 2,8 процента — до 85,05 доллара за баррель.\n' + 'Цена на нефть марки WTI впервые с 3 июля поднялась выше 75 долларов за баррель и составила 75,09 доллара, свидетельствуют данные торгов.\n' + 'Повышение нефтяных котировок связано с предстоящим вступлением в силу американских санкций против Ирана, считают эксперты.\n' + '\n' + 'США, выйдя в мае из иранской ядерной сделки, восстанавливают ограничения против исламской республики. В начале ноября вступят в силу санкции против энергетического сектора. Вашингтон заявил о планах довести экспорт нефти из Ирана до нуля.\n' + '\n' + 'Кроме того, трейдеры оценивают данные Министерства энергетики США, согласно которым Кувейт впервые за 25 лет почти прекратил экспорт сырой нефти в Соединенные Штаты. По данным агентства Блумберг, Кувейт переориентировался на более привлекательный рынок Азии, куда уходит до 80 процентов его экспорта.\n' + '\n' + 'Сделка по иранскому атому\n' + '\n' + 'Иран и шестерка международных посредников (Россия, США, Британия, Китай, Франция, Германия) 14 июля 2015 года достигли соглашения об урегулировании проблемы иранского атома. Выполнение условий снимало с Ирана введенные ранее ограничения со стороны Совбеза ООН, США и Евросоюза.\n' + 'В мае Дональд Трамп объявил, что Вашингтон выходит из соглашения. Он сообщил о восстановлении всех санкций против Ирана, в том числе вторичных, то есть в отношении других стран, ведущих бизнес с Ираном. Остальные члены шестерки выступили против этого шага США.\n' + '\n' + 'Иран заявил о создании двусторонних механизмов по торговле нефтью в обход санкций США.\n' + '\n' + '\n' + '\n' + 'l\n' + '\n' + '\n' + 'z\n';
  userId: string = 'asdbashbkljndfajldnlaj';
  comments: Comment[] = [];

  constructor() {
  };

}