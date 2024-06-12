## Streszczenie
Praca inżynierska przedstawia rozwój interaktywnej aplikacji webowej do nauki języka angielskiego, która integruje różnorodne metody nauczania. Oprócz modułów do powtarzania i utrwalania słownictwa opartych na technice spaced repetition, aplikacja zawiera także sekcje z czytankami służącymi rozbudowie kompetencji językowych oraz moduły do nauki i testowania wiedzy o czasownikach nieregularnych. Tworzone przez użytkowników oraz administratora zestawy słówek, interaktywne czytanki oraz testy, wspierane przez technologie Postgresql, SpringBoot i Angular, współgrają, tworząc kompleksowy system nauki języka. Rezultaty testów użytkowych aplikacji potwierdzają jej efektywność i użyteczność, otwierając drogę do dalszych usprawnień i możliwości wykorzystania w edukacji językowej.

## Motywacja
Głównym celem niniejszej pracy inżynierskiej jest zaprojektowanie i opracowanie aplikacji webowej do nauki języka angielskiego, która będzie służyć jako innowacyjne narzędzie wspomagające proces edukacyjny, zwłaszcza dla osób udzielających prywatnych korepetycji. Aplikacja ta ma na celu adresowanie dwóch kluczowych wyzwań w nauce języka angielskiego: potrzeby regularności w procesie edukacyjnym oraz skutecznego rozwijania i utrwalania słownictwa.

## Wymagania funkcjonalne

Wymagania funkcjonalne określają konkretne działania i procesy, które aplikacja powinna realizować, aby spełnić oczekiwania i potrzeby użytkowników. W mojej aplikacji do nauki języka angielskiego, te wymagania obejmują szereg funkcji edukacyjnych i wsparcia, mających na celu ułatwienie i usprawnienie procesu nauki oraz komunikacji między nauczycielami, uczniami i rodzicami. Oto krótki opis każdego z tych punktów:

- **Zestawy słówek** – Umożliwia użytkownikom tworzenie, edytowanie i naukę personalizowanych zestawów słówek, zapewniając efektywny sposób na rozbudowę słownictwa.
- **Rejestrowanie progresu** – Funkcja monitorująca i prezentująca postęp użytkownika w nauce, pomagająca w ocenie efektywności metod i planowaniu dalszej nauki.
- **Czytanki** - Oferuje dostęp do różnorodnych tekstów i artykułów w języku angielskim, wspomagających rozwijanie umiejętności czytania i zrozumienia tekstu.
- **Czasowniki nieregularne** - Sekcja poświęcona nauce i powtórce czasowników nieregularnych, kluczowych w gramatyce angielskiej.
- **Blog o nauce języka angielskiego** - Zawiera artykuły i porady dotyczące nauki języka angielskiego, stanowiące dodatkowe źródło wiedzy i inspiracji.
- **Zarządzanie kontem** - Umożliwia użytkownikom personalizację ustawień aplikacji, zarządzanie danymi osobowymi oraz monitorowanie własnej aktywności.
- **Integracja z ChatGPT** - Współpraca ze sztuczną inteligencją, oferująca pomoc w rozwiązywaniu wątpliwości językowych oraz interaktywne wsparcie w nauce.
- **Powiadomienie ucznia na e-mail o powtórce** - System automatycznych powiadomień mailowych przypominających uczniom o zaplanowanych sesjach nauki lub powtórkach.
- **Mailing do rodziców** - Funkcja umożliwiająca nauczycielom wysyłanie zautomatyzowanych raportów dotyczących postępów i aktywności uczniów do ich rodziców.
- **Komentarze** - Funkcja umożliwiająca użytkownikom komentowanie i wymianę opinii na temat treści edukacyjnych w aplikacji.

## Wymagania niefunkcjonalne

Wymagania niefunkcjonalne definiują jakość i standardy, których aplikacja musi przestrzegać, aby zapewnić najlepsze doświadczenie użytkownika oraz niezawodność i bezpieczeństwo systemu. Oto rozszerzony opis tych wymagań dla mojej aplikacji:

- **Responsywność** - Aplikacja będzie zoptymalizowana do pracy na różnych urządzeniach, od smartfonów po komputery stacjonarne, zapewniając wysoką jakość użytkowania niezależnie od rozmiaru ekranu i platformy.
- **Intuicyjne GUI** - Interfejs użytkownika będzie zaprojektowany z myślą o prostocie i intuicyjności, aby nawet osoby niezaznajomione z nowoczesnymi technologiami mogły łatwo nawigować i korzystać z aplikacji.
- **Optymalizacja wydajności** - Zastosowanie technik takich jak efektywne zarządzanie danymi (np. wykorzystanie wzorców DTO), ładowanie leniwe komponentów, i minimalizacja zapytań do bazy danych będzie miało na celu zapewnienie szybkiego ładowania się stron i płynności działania aplikacji.
- **Modułowość** - Aplikacja będzie zbudowana w sposób modularny, co ułatwia jej rozwój, konserwację i testowanie, a także pozwala na łatwe dodawanie nowych funkcji lub modyfikowanie istniejących.
- **Bezpieczeństwo** - Aplikacja będzie wyposażona w zaawansowane mechanizmy bezpieczeństwa, w tym szyfrowanie danych oraz uwierzytelnianie i autoryzację użytkowników, aby chronić dane osobowe i zapobiegać nieuprawnionemu dostępowi.
- **Kompatybilność z przeglądarkami** - Aplikacja będzie testowana i zoptymalizowana do pracy w najpopularniejszych przeglądarkach internetowych, zapewniając spójne doświadczenie użytkownika na różnych platformach.
- **Trójwarstwowa architektura** - Zastosowanie podziału na warstwę prezentacji, warstwę logiki biznesowej i warstwę danych pozwoli na wyraźne oddzielenie odpowiedzialności, co ułatwi zarządzanie i rozwój aplikacji.
- **Wysoka dostępność i skalowalność** - Aplikacja będzie zaprojektowana tak, aby zapewnić wysoką dostępność i skalowalność, co pozwoli na obsługę wzrostu liczby użytkowników oraz zapewnienie stabilności działania nawet przy wysokim obciążeniu.



## Zrzuty niektórych ekranów aplikacji 

### Strona startowa
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/13f857b6-faa3-443b-83d3-b1f061526aba">

### Ekran logowania
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/0d63e73e-915d-450b-acee-ca876692cfe2">

### Strona główna
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/4efb8392-990d-4fd3-89f7-5f5211839bfa">

### Czytanki
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/d3f62d34-3cf4-4133-a6a1-34bf56b62e47">

<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/cb7a5191-04ea-4a3c-93a4-03a0380949b4">

<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/90abef9c-89a4-4c98-84b7-7dbe4ad7dd74">


### Czasowniki nieregularne
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/682716df-ded2-4326-97ab-20b44bafe021">

<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/d0cb1db2-b46a-4531-a0bb-b8ea1f888e97">


### Chatbot
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/34b79072-0e14-4839-8840-a34273200364">

### Blog 
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/b5ef085d-24ab-4c3e-85c6-b9536c3bd7aa">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/cf556cda-bc96-44b0-9735-3f967e6c6e35">

### Zestawy słówek
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/b98ebe0d-40e8-4ecd-b979-157e63e1736b">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/b11156a1-ee35-4ce1-934e-69341d875fcc">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/8bd0b1a0-6344-489f-ac39-10256bda5b80">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/af417214-ee70-4245-a547-7d94ac6e555c">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/fa112147-f26a-45be-b9d7-0b12ef3b27a1">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/08e3cdaa-aad3-4536-9d78-c30be55edde6">
<img width="363" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/28f7499a-e516-4a99-a080-c5fe429f36dd">


### Kilka zrzutów wersji mobilnej (375x667 (Iphone SE 2 gen)
<img width="115" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/ac99b2cf-7a66-4851-acb4-9470b62fe11c">
<img width="128" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/b08b5c35-86ec-4760-8736-3f0452c1922d">
<img width="128" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/57ca1ff8-b92b-4feb-8b24-e89a2a0a8fa9">
<img width="128" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/5569bac7-415b-4373-86cc-57ce4ccf1df2">
<img width="128" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/f7bb8cb3-1e17-4ba5-afa2-b24dfe7776e2">

### Kilka zrzutów wersji mobilnej (iPad Pro 1024x1366)
<img width="233" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/fa2ae437-ae3c-4df4-92a2-6ea7e4d18295">
<img width="232" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/d6f3b135-8223-4adc-9448-7ca6436f0973">
<img width="234" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/b19a3f42-6625-4839-86a6-dcf39d945a7e">
<img width="233" alt="image" src="https://github.com/ukikiepas/dzisiaj-powtorzylem-web/assets/115621536/52ea8d5c-5186-4576-b5b6-f55dbce6090f">


## Refleksje i osobiste doświadczenia
Rozwój tej aplikacji był dla mnie nie tylko wyzwaniem inżynierskim, ale również podróżą pełną osobistych odkryć i nauki. Praca nad projektem umożliwiła mi pogłębienie wiedzy technicznej i zdobycie praktycznych umiejętności, które są bezcenne w mojej dalszej karierze zawodowej. 
Jedną z najważniejszych lekcji, jaką wyniosłem, jest znaczenie dokładnego planowania i analizy wymagań przed rozpoczęciem fazy programowania [12]. Zrozumiałem, że jasno zdefiniowane cele i dobrze zaplanowany zakres pracy są kluczowe dla sukcesu projektu. Ta praca była również okazją do zrozumienia, jak ważne jest elastyczne podejście do rozwiązywania problemów i gotowość do adaptacji w miarę zmieniających się wymagań i napotkanych wyzwań.	
Technicznie, projekt dał mi głębsze zrozumienie zarówno warstwy prezentacji jak     i logiki biznesowej, łącząc teorie, które studiowałem, z praktycznym zastosowaniem. Praca nad aplikacją pozwoliła mi również docenić wartość narzędzi, takich jak IntelliJ IDEA czy SonarLint, w procesie tworzenia i utrzymywania czystego, efektywnego kodu.
Osobiście, projekt ten był również źródłem satysfakcji i motywacji. Widząc, jak moje pomysły i praca przekształcają się w działającą aplikację, która ma realny potencjał wpływu na edukację i naukę, utwierdziło mnie w przekonaniu, że wybrana ścieżka kariery jest właściwa. Ta praca inżynierska zdecydowanie wzmocniła moje zainteresowanie rozwojem oprogramowania edukacyjnego i przyczyniła się do rozwoju moich umiejętności jako programisty.
