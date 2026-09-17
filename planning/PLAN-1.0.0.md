# Claudian 1.0.0 — Ürün ve teslim planı

Durum: 16.09.2026 itibarıyla yerel Claude akışı ve geçiş geliştirmesi; kaynak sürümü `1.0.0-alpha.2`, yayımlanmış 1.0.0 değildir. Başlangıç kaynağı yayımlanmış 0.18.7'dir. Yeni depo eski uygulamanın yerine geçirilmez. Kullanıcı uygulama, ajanlarla denetim ve hazır olduğunda GitHub/website yayını yetkisi verdi.

## Uygulanacak ürün kararı

**Claudian bir bağlantı ayarları paneli değil, kullanıcının AI'lar arasında yanında taşıdığı hafızadır.** Teslimin ölçüsü: kullanıcı bir AI'a verdiği kalıcı bilgiyi diğerinde yeniden anlatmaz; düzelttiği bilgi güncel kalır. Kart, hook, protokol veya test sayısı bu sonucun yerine geçmez.

- Mevcut genel Markdown deposu ve güvenli ortak araçlar korunacak; kişisel Core davranış referansı olacak. Yeni veritabanı veya sağlayıcı başına ayrı hafıza motoru kurulmayacak.
- Yerel dağıtım sürümlü paket, web/mobil dağıtım ortak yayımlanabilir entegrasyon + kişiye özel yetki olacak. Kullanıcıdan connector geliştirmesi beklenmeyecek.
- İlk tam akış Claude Desktop yerel kurulumudur; bunu Claude uzak/mobil ve ChatGPT genel entegrasyon hazırlığı izler. Yerel başarı mobil hedefin yerine geçmez. Diğer istenen yüzeyler kapsamdan silinmez; resmî destek koşuluna göre açık durumda kalır.
- İlk taramanın garantili kapsamı seçilen notlardır. Sağlayıcının özel hafızası/geçmişini içe aktarma genel dizin sürümünün varsayılanı olmayacak; dağıtım kurallarıyla uyumu ayrıca çözülür.
- Bilgisayar açıkken uzak erişim taşınır. Bilgisayar kapalı erişim için kullanıcı verisini sessizce buluta kopyalama veya yeni ücret başlatma yoktur.

Dayanaklar: [Dağıtım ve yüzeyler](DISTRIBUTION-1.0.0.md), [çekirdek kararları](CORE-DECISIONS-1.0.0.md), [uygulama ayrımı](ISOLATION-1.0.0.md). Bunlar teknik karar kayıtlarıdır; sağlayıcı onayı ve gerçek kullanıcı kabulü yerine geçmez.

## Sabit ürün hedefi

Çalışan kişisel ortak hafıza yöntemini, başka insanların kendi Obsidian/Markdown notları ve zaten kullandığı AI hesaplarıyla kolayca kullanabileceği bir ürüne dönüştürmek.

Kullanıcı klasörünü ve AI aracını seçer, anlaşılır izin onayını verir; bağlantı ve bakım işini ürün üstlenir. Kullanıcının sunucu adresi üretmesi, connector geliştirmesi, terminal komutları öğrenmesi veya hata ayıklaması olağan kurulum olamaz. Sağlayıcı zorunlu bir elle adım gerektiriyorsa bu gerçek, bağlantı seçilmeden önce açıkça görünmelidir.

Hafıza insan-okunabilir, taşınabilir ve kullanıcıya aittir. AI gerekli bağlamı seçer, kalıcı bilgiyi doğru nota işler, mevcut hatayı düzeltir; ham sohbet dökmez. Başarılı bakım sessizdir. Araçların hiç bulunmaması dahil erişememe ilk yanıtta kısa bildirilir. Bu davranış, araçlar yokken de ulaşılabilen sağlayıcı talimat yüzeyinde taşınmalıdır.

## Vizyon ve 1.0.0 kapsamı

1.0.0'ın ilk teslimi güvenilir, kolay kurulan ortak hafızadır. Süreklilik ve yol arkadaşı projenin geniş vizyonudur; bağlantı yöneticisi projenin nihai kimliği değildir.

İlk kapsam: klasör seçme, mevcut notları koruma, desteklenen AI'a bağlantı kurma, gerçek erişim durumu, seçici okuma/yazma/düzeltme, boş hafızada da tamamlanabilen ilk tarama, güvenli güncelleme/bağlantı kaldırma.

Brain Packs, federation, marketplace, karakter/oyunlaştırma, yeni dispatcher ve sürekli model çalıştırma bu teslimin ön koşulu değildir. Bilgisayar kapalıyken erişim ayrı kapsam kararıdır; yerel vault'u relay kullanarak erişilebilir tutmuş gibi davranılmaz.

## Eski sürümden korunacaklar

| Parça | Ne korunur | Yeniden kabul gereken sınır |
| --- | --- | --- |
| Görsel kimlik | Mevcut renkler, fontlar, ikonlar, bağlantı kartları ve odaklı pencere yaklaşımı | Kolay kullanım; kabul edilmiş tasarım sırf temiz başlangıç için atılmaz |
| Not davranışı | Kaynak ayrımı, seçici kalıcılık, mevcut kaydı düzeltme, MOC/link yaklaşımı | Yeni kullanıcı ve uzun sohbet davranışı |
| Veri koruma | Notların sahipliği, dar yazma sınırı, geri alınabilir işlemler | Klasör değişimi, yükseltme ve yarım işlem |
| Bağlantı altyapısı | İşe yarayan MCP, OAuth, yerel paketleme ve güncelleme parçaları | Hiçbiri yalnız eski testleri geçti diye yeni mimarinin zorunlu parçası sayılmaz |
| Dağıtım | Yükleyici + checksum ve website/GitHub hizası | 1.0.0 kendi güncelleme kanalı olmadan 0.18.7'yi değiştirmez |

Kişisel hesap adları, cihaz adresleri, vault içerikleri, persona ve özel talimatlar ürüne kopyalanmaz. Çalışan kişisel Core'un davranışı ve erişim biçimi referanstır; kullanıcının verisi örnek veri değildir.

## Kodlama öncesi kapanması gereken kararlar

Aşağıdaki açıklar kullanıcıya vizyonu tekrar anlattıracak sorular değildir. Teknik destek ve dağıtım gerçeği araştırılarak somut seçenek hazırlanır. Yalnız gerçek maliyet, mahremiyet veya ürün kapsamı seçimi kullanıcıya bırakılır.

| Kimlik | Açık karar | Kapanması için gereken çıktı |
| --- | --- | --- |
| K1 | 1.0.0'da hangi yüzeyler tam destekli? | Claude Desktop, Claude web/mobil, ChatGPT web/mobil, Codex, Claude Code, Gemini web/Spark, Antigravity, Perplexity ayrı satırlar; hesap ve dağıtım koşulları. Kart sayısı başarı ölçütü değil. Destek daraltması sessizce yapılmaz. |
| K2 | Paylaşılabilir entegrasyon nasıl dağıtılacak? | Her sağlayıcı için resmî paket/dizin/paylaşım yolu, yayın/onay koşulu, boş hesapta gerçek kurulum adımları. Ortak paket ile kullanıcının cihaz izni ayrı. Evrensel tek paket varsayılmaz. |
| K3 | Eski çalışan Core mu, ürün Core'u mu; hangi parçalar? | Kişisel çalışma referansıyla ürünün giriş, okuma, yazma, düzeltme ve mobil erişim eşlemesi. Yeniden yazılan her parçanın somut gerekçesi. |
| K4 | Yerel ve uzak erişim nasıl tek ürün deneyimi olacak? | Yerel extension ve hesap connector'ı gerektiren yüzeyler; paylaşılan davranış sözleşmesi; eski hesaptan geçiş. Yeni sunucuya geçmek eski bağlantıyı otomatik taşımış sayılmaz. |
| K5 | Erişim yoksa bildirim hangi yüzeyde bulunacak? | MCP hiç yüklenmemişken de okunabilen talimatın kurulum/güncelleme yolu. Hesaba yazılmış eski susma kuralının onaylı güncellemesi. |
| K6 | Okuma/yazma durumu nasıl doğrulanacak? | Kurulum, hesap izni, araç keşfi, okuma, yazma, ilk tarama ayrı durumlar. Platform güvenlik engeli başarıya çevrilmez; engeli dolanma yöntemi geliştirilmez. |
| K7 | Mobil ve bilgisayar-kapalı kullanımın sınırı? | Açık bilgisayar üzerinden Claude mobilin mevcut yolunun taşınması; diğer mobil yüzeylerin resmî destek koşulu. Bilgisayar kapalı erişim için barındırma/veri/maliyet seçenekleri ayrı karar. |
| K8 | Hook ve protokol maliyeti? | İnce giriş ve gerekli bağlam yaklaşımı; çalışan davranışı bozmadan hangi ek mekanizma gerektiğine kanıt. Her tur töreni varsayılan mimari zorunluluk değil. Sayısal bütçe kullanıcı onayına sunulur. |
| K9 | Mevcut kurulumla yan yana yaşama ve geçiş? | Ayrı uygulama kimliği, veri dizini, güncelleme kanalı, açık migration ve geri dönüş tasarımı. Ortak kaynak kopyası bunları otomatik izole etmez. |

**Uygulama kapısı:** Bir uygulama diliminin dayandığı karar, kanıt ve kullanıcı etkisi yazılı olmalı. Bağımsız güvenli dilimler diğer sağlayıcıların onayını beklemeden yapılır. Çözülemeyen sağlayıcı koşulu o yüzeyin yayın engeli olarak kalır; daha uzun prompt yazarak kapatılmaz. Bu plan tek başına kararların kapandığı anlamına gelmez.

## Hedef kullanıcı akışı

1. Kullanıcı mevcut klasörünü seçer veya yeni bir not alanı oluşturur. Gerçek hedefi görür; başka klasör seçmek hedefi gerçekten değiştirir.
2. Kullandığı AI yüzeyini seçer. Hesap uygunluğu ve gereken elle onaylar bu noktada belli olur; başarısız olacak test önüne konmaz.
3. Ürün seçilen resmî dağıtım yoluyla entegrasyonu hazırlar/başlatır. Kullanıcı kendi entegrasyonunu geliştirmek zorunda bırakılmaz. Gerekli sağlayıcı onayı kullanıcıda kalır.
4. Ürün hangi uygulamanın hangi klasöre hangi işlemler için erişeceğini açıklar. İzin yalnız seçilen kapsam içindir.
5. AI'a erişim sınanır. Başarılı okumayla engellenmiş yazma farklı gösterilir. Eskiden kalan veya başka konaktan gelen sonuç yeni bağlantı kanıtı olmaz.
6. İsteğe bağlı ilk tarama yalnız erişilebilir/onaylı içerikle yapılır. Boş vault geçerli sonuçtur; profil anketi veya içerik uydurma yoktur.
7. Normal kullanım başlar. Yeni sohbet ve uzun sohbetlerde ilgili bilgi kullanılır; kalıcı sonuçlar uygun yerde güncellenir. Teknik başarı mesajları sohbeti doldurmaz.

Bu akış bir tasarım sözleşmesidir; sağlayıcıda gerçekleşmeyen otomasyonun mockup'ta gerçekleşmiş gibi gösterilmesine izin vermez.

## Kabul matrisi

| Senaryo | Kabul koşulu |
| --- | --- |
| Temiz cihaz / boş sağlayıcı hesabı | Geliştiricinin hazır connector'ı, adı veya geçmiş izni kullanılmadan bağlantı kuruluyor |
| Klasör değişimi | UI, profil, araçların okuduğu yer ve test hedefi aynı yeni klasör; eski notlara beklenmedik yazma yok |
| Selamlaşma | Erişim varsa sessiz hazırlık; yoksa kısa bildirim; erişmiş gibi konuşma yok |
| Okuma başarılı, yazma engelli | Okuma doğrulanmış, yazma engelli/belirsiz; “tamamlandı” veya tam yeşil değil |
| Hesapta destek yok | Açık engel, normal çıkış; olmayan düğme aratılmıyor, test döngüsü yok |
| Yanlış/eski connector | Yanlış vault veya araç sürümü sessiz kabul edilmiyor; mevcut bağlantılar otomatik silinmiyor |
| İlk tarama / boş vault | Doğru raporla bitebiliyor; kişisel bilgi soruları zorunlu değil |
| Ortak hafıza | Bir AI'ın kaydettiği izinli bilgi diğerinde kullanılabiliyor; persona karışmıyor |
| Seçici bakım | Geçici bilgi yazılmıyor; karar/düzeltme uygun nota işleniyor, eski çelişkili kayıt yürürlükte bırakılmıyor |
| Uzun sohbet | Bakımın sürmesi ve maliyeti ölçülüyor; hook sayısı başarı ölçütü değil |
| Mobil | Hedef gerçek telefon uygulamasında ilgili hesapla okuma/yazma; desktop testi yerine geçmiyor |
| Güncelleme / kaldırma | Eski sürüm ve notlar korunuyor; checksum doğrulanıyor; gereken yeniden bağlantı açık gösteriliyor |

Her kabul kaydı kullanılan sürüm, yüzey, ortam, beklenen/gerçek sonuç ve sınırı içerir. Canlı kurulum ve kabul ayrı oturumda yapılır; mevcut devre göre Claude Code tarafından yürütülmesi beklenir. Otomatik test sonucu gerçek hesap kabulünün yerine geçmez.

## Uygulama sırası — plan önerisi

- **P0: Kararları kapat.** K1–K9; çalışan kaynak eşlemesi ve sağlayıcı dağıtım matrisi. Çıktı: karar kaydı ve uygulanabilir kapsam, yeni sürüm değil.
- **P1: Tek bir tam dikey akış.** Seçilecek referans yüzeyde boş hesap + klasör + kurulum + gerçek erişim. Kullanıcıya gösterilen deneyimle altyapı birlikte çalışır. Diğer yüzeyler tamamlandı görünmez.
- **P2: Aynı davranışı diğer kabul edilmiş yüzeylere taşı.** Kurulum biçimi farklı olabilir; hafıza ve durum sözleşmesi aynı kalır.
- **P3: Mobil, bakım ve yükseltme kabulü.** Destek sözü verilen mobil yüzeyler, uzun sohbet, geçiş ve geri dönüş.
- **P4: 1.0.0 yayın kararı.** Bütün vaat edilen akışlar kabul edilince ayrı sürüm, yükleyici/checksum, GitHub ve website. Sırf kaynak kopyalandı diye package sürümü 1.0.0 yapılmaz.

Süre tahmini kararlar kapanmadan verilmez. Yeni öneri hedefi değiştiriyorsa kullanıcı kararı gerekir; uygulanacak somut çözüm hazırlanmadan yeniden geniş vizyon soruları sorulmaz.

## 15.09 karar durumu ve somut teslimler

| Karar | Seçilen yön | Henüz tamamlanmayan |
| --- | --- | --- |
| K1/K2 | Yerel Claude referansı; ortak uzak entegrasyon; yüzey matrisi yazıldı | Genel dizin onayı, boş hesap kurulumları, Gemini/Perplexity dağıtımı |
| K3/K4 | Mevcut genel store + ortak araçlar; yerel/uzak erişim aynı davranışa bağlı | Ortak servis kimliğiyle kullanıcı-cihaz eşlemesi ve eski bağlantı geçişi |
| K5 | Erişim yoksa ilk yanıtta kısa bildirim; kaynak metinleri düzeltildi | Eski hesap talimatının güncellenmesi, araç yokken canlı davranış |
| K6 | İzin, kurulum, araç görünürlüğü, okuma, yazma, ilk tarama ayrı kanıt; test klasör/izin/protokol/süre sınırı kaynakta düzeltildi | Engelli yazma UI kabulü ve gerçek klasör değişimi boyunca tüm bağlantıların geçişi |
| K7 | Bilgisayar açıkken aynı vault'a mobil erişim | Gerçek telefon kabulü; bilgisayar kapalı kullanım ayrı maliyet/veri kararı |
| K8 | Seçici hafıza korunur; runtime/hook/skill yönergelerinde operasyonel tur kaydı isteğe bağlı yapıldı | Kurulu adaptörlere sürümlü geçiş ve canlı davranış/maliyet karşılaştırması |
| K9 | Next kimlik/profil/kaldırıcı/güncelleme ayrımı kaynakta uygulandı | Ortak host dosyası sahipliği, geçiş ve iki kurulum kabulü |

**Bir sonraki geliştirme dilimi:** Claude Desktop paketinin temiz kurulum yolu ile host dosyası sahipliğini birlikte tamamla. Klasör seçimi → hazırlanmış paket → sağlayıcı onayı → gerçek okuma/yazma → başka AI'da aynı bilginin kullanımı. Yol/JSON/terminal yazdıran akış geçmez. Önce mevcut paketleme kodundaki açığı kapat; yeni kurulum mekanizması yalnız somut gereksinimle eklenir.

Genel dizin için dışarıdan dinamik talimat çekme yerine pakette sürümlü davranış ve veri araçları ayrımı gerekir; seçili notların kullanıcı bağlamı olması dışarıdan çalışma talimatı indirmekle karıştırılmaz. Bu uyarlama ve başvuru tamamlanmadan genel katalogdan tek tuş vaat edilmez.

## Planın mevcut durumu

- [x] 0.18.7 etiketinden ayrı kaynak çalışma alanı oluşturuldu.
- [x] Mevcut UI/UX ve kaynak geçmişi korundu.
- [x] Ürün hedefi, açık kararlar, kabul ölçütleri ve uygulama sırası ayrıldı.
- [ ] K1–K9 teknik karar dosyaları tamamlandı ve kapsam kabul edildi.
- [x] İlk kaynak dilimi: Next geliştirme kimliği ve erişememe bildirimi düzeltmesi.
- [ ] 1.0.0'ın tamamının implementasyonu.
- [ ] Gerçek kullanıcı/hesap kabulü.
- [ ] 1.0.0 yayını.

Next uygulama profili ve güncelleme yolu ayrıldı. AI uygulamalarına yazılan ortak dosyaların sahipliği henüz ayrılmadığından normal önizlemede kurulum/onarım ve hesap değiştiren işlemler kapalıdır; arayüz bunu baştan bildirir. Yalnız işaretlenmiş izole kabul ortamında geliştirme akışı açıktır. Tam yan yana kullanım hazır değildir.

### Ajan denetimi ve bu teslimin sınırı

Dağıtım araştırması, kaynak eşlemesi ve izolasyon uygulaması üç ayrı ajana verildi; kaynak eşlemesi ve izolasyon ajanları birbirinin alanlarını ayrıca inceledi. Ana ajan bulguları birleştirdi. Denetimde bulunan gerçek host dosyalarına dokunma riski işlem kapısıyla; hesap talimatının kesin davranış vaat etmesi TR/EN metin düzeltmesiyle ele alındı. Eski hesap talimatlarının otomatik güncellenmediği açık kaldı.

Protokol yükseltme/çakışma koruması için 9, Next izolasyonu için 6 hedefli kontrol geçti; kaynak sözdizimi kontrol edildi. Gerçek hesap kurulumu, tam ürün test paketi, yükleyici ve yayın yapılmadı. Bu kontroller kolay kurulumun veya sürdürülen ortak hafızanın kullanıcı kabulü değildir.
## Yol arkadaşı yüzeyi — 15.09 ilk uygulama

Karakterli panel ve gerçek yerel kaynak karşılıkları uygulandı; ayrıntı [yüzey sözleşmesi](COMPANION-SURFACE.md). Mevcut Core odak/kartları önceliklidir. Yerel açık madde göstermek tam bağlam motoru değildir. Öğrenen çift yönlü takip, Core geri bildirim API'si ve gerçek kurulum kabulü açık kalır. Masaüstü kaynak değişikliği yayımlanmadı.

## 23.55 devamı — 16.09 kaynak teslimi

- [x] Zorunlu her-tur operasyonel kayıt varsayılandan ayrıldı; runtime, hook ve TR/EN skill yönergeleri uyumlu. [K8 ayrıntısı](K8-OPTIONAL-REVIEW.md).
- [x] Eski bağlantı testinin başka klasör/izin/protokol için güncel kanıt sayılması engellendi. [Kapsam ve kalan yarış sınırı](VERIFICATION-SCOPE.md).
- [ ] Öncelikli devam: ortak host dosyası sahipliği, profil yazarları için ortak eşzamanlılık koruması ve Claude Desktop hazır paket akışı.
- [ ] Yol arkadaşı: gerçek bağlam değerlendirmesi ve Core'a çift yönlü geri bildirim.
- [ ] Genel uzak dağıtım ve sürümlü geçiş, ardından kullanıcının yapacağı uçtan uca kabul. Bu tur hesap/kurulum testi veya yayın yapılmadı.

## 05.00 devamı — 16.09 çalışma zamanı bağlantıları

- [x] Yol arkadaşı JS/CSS dosyaları masaüstünün gerçek protokol listesine eklendi. Önceki tarayıcı görselleri bu eksikliği yakalamıyordu.
- [x] Profilsiz normal önizleme artık engelli kurulum ekranında takılmaz; panel açılır. Kurulu olmayan hafıza açık belirtilir; gerçek bağlantı mutasyon kapısı korunur.
- [x] Mevcut Core oturumu yeniden açılışta geri yüklenebilir. Uygulamaya ait oturum çerezi yoksa ağ çağrısı yapılmaz; normal salt okunur önizlemede uzak erişim yine kapalıdır.
- [x] Claude eklentisi ancak doğru uygulama sürümü, etkinlik, dosya yolları ve launcher eşleşmesiyle güncel sayılır. Eski/devre dışı ilk kopya sonraki sağlıklı kurulumu gölgelemez.
- [x] Dışa aktarılan connector skill'inde kalan zorunlu tur muhasebesi cümlesi kaldırıldı.

17 hedefli kontrol (7 paket/durum, 6 izolasyon, 3 protokol/önizleme, 1 oturum devamı) geçti. Bunlar geçici dosyalar ve sahte transport ile teknik kontrollerdir; Electron üzerinde kullanıcı kabulü, gerçek hesap girişi, kurulum veya yayın değildir. Öncelikli açık işler önceki dilimdeki host sahipliği/kolay kurulum, ortak profil yazma koruması, genel dağıtım ve gerçek çift yönlü bağlam motorudur.

## 16.09 — ilk kullanılabilir yerel akış

- [x] Ortak profil yazarlarının eşzamanlılık koruması.
- [x] Claude Desktop için tek Next extension yolu; eski JSON/extension kayıtlarını koruma.
- [x] Normal önizlemede yalnız bu yerel akışın açılması; hazır paket sürükleme ve gerçek erişim kanıtına geçiş.
- [x] Yol arkadaşında açık maddeyi kaynak notta tamamla/düzelt; hash, yazma yetkisi ve makbuz denetimi.
- [x] `1.0.0-alpha.2` Windows uygulama paketi üretildi.
- [ ] Gerçek Claude paket teslimi/etkinleştirme ve kullanıcı kabulü.
- [ ] Diğer hostların ortak dosya sahipliği ve geçişi; genel uzak entegrasyon dağıtımı.
- [ ] Kaynaklar arası beklenti/bağlam sentezi ve ona bağlı geri bildirim döngüsü.
- [ ] Final 1.0.0 sürümü, GitHub release ve websitesi. Kullanıcı hazır olduğunda deploy yetkisini verdi; tamamlanmamış akışlar final diye yayımlanmaz.

[Bu dilimin davranışı ve sınırları](LOCAL-CLAUDE-ALPHA2.md). Kullanıcının uçtan uca testi ayrı tutulur. Önceki önizlemenin bütün mutasyonları kapattığı açıklamalar bu dilim için yerel Claude istisnasıyla güncellenmiştir.

## 16.09 — dağıtım öncesi devam

- [x] Yerel Claude klasör değişimi; eski global izinler korunur, yeniden başlatma istenir, eski test yeni klasöre taşınmaz.
- [x] Extension bağlantısı ve ilk tarama için MCP gönderimi zorunlu. 7 hedefli kontrol geçti.
- [x] Yeni Codex MCP kaydı `claudian-next` adı ve ayrı sahiplik bloğu kullanır; güncelleme/kaldırma kayıt değişmişse reddeder. Eski `claudian` korunur. Sahiplik + yükseltme/kaldırma regresyonları 20/20 geçti.
- [ ] Codex skill/kural/geçiş sahipliği hâlâ açık; bu nedenle normal kurulum kapısı Codex için açılmadı.
- [x] Windows alpha.2 NSIS yükleyicisi üretildi; final release olarak yayımlanmadı.
- [ ] [Ortak gateway ve cihaz eşleme](PUBLIC-GATEWAY.md) uygulanacak. Mevcut kişisel web Core çok kullanıcılı dağıtım değildir.

Kaynak GitHub'a gönderildi. Final website/release ve gerçek hesap kabulü tamamlandı sayılmaz.

## 17.09 — erişimi geri alma

- [x] Yerel Claude kartına erişimi kesme ve açık onay eklendi; dar işlem kapısı yalnız Claude kaldırmayı kabul eder. Notlar/eski bağlantılar korunur, extension kaldırmanın Claude içinde yapıldığı belirtilir.
- [x] Bağlantı yeniden ekleme ekranı normal önizlemede yalnız desteklenen yerel Claude seçimini sunar; diğer hostları seçtirip işlem kapısında reddetmez.
- [x] Üç hedefli kapı/extension kontrolü ve renderer sözdizimi kontrolü geçti. Canlı hesap testi yapılmadı.
- [ ] Bu kaynak dilimi önceki alpha.2 yükleyicisinde yoktur; yeniden paketleme ve final yayın açık.
