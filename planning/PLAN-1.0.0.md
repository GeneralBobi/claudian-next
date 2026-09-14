# Claudian 1.0.0 — Ürün ve teslim planı

Durum: planlama; 1.0.0 yazılımı veya yayınlanmış sürümü değildir. Başlangıç kaynağı yayımlanmış 0.18.7'dir. Yeni depo eski uygulamanın yerine geçirilmez. Bu belge kullanıcı hedefleriyle uygulama önerilerini açıkça ayırır.

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

**Kodlama kapısı:** K1–K9 için karar, dayanak ve kullanıcı etkisi yazılı olmalı. Çözülemeyen sağlayıcı koşulu açık engel olarak kalır; daha uzun prompt yazarak kapatılmaz. Bu plan tek başına kararların kapandığı anlamına gelmez.

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

## Planın mevcut durumu

- [x] 0.18.7 etiketinden ayrı kaynak çalışma alanı oluşturuldu.
- [x] Mevcut UI/UX ve kaynak geçmişi korundu.
- [x] Ürün hedefi, açık kararlar, kabul ölçütleri ve uygulama sırası ayrıldı.
- [ ] K1–K9 teknik karar dosyaları tamamlandı ve kapsam kabul edildi.
- [ ] 1.0.0 implementasyonu.
- [ ] Gerçek kullanıcı/hesap kabulü.
- [ ] 1.0.0 yayını.

Bu depo eski uygulama kimliği ve güncelleme adreslerini miras alır. İzolasyon kararı uygulanmadan çalıştırıp kurmak eski kurulumla çakışabilir. Şimdilik kaynak ve planlama alanıdır.
