# 1.0.0 geliştirme ayrımı — K9 ilk adım

Durum: kaynak değişikliği, `1.0.0-alpha.1`; yayın veya canlı kurulum değildir.

## Uygulanan sınır

- Paket/çalıştırılabilir dosya/kısayol adı `Claudian Next`; uygulama kimliği `app.claudian.next`. NSIS yükleyici adı `Claudian-Next-Setup-…`.
- Normal Electron profili `%APPDATA%/Claudian Next`. Eski `%APPDATA%/Claudian Desktop` profili otomatik okunmaz veya taşınmaz. İşlem kilidi bu ayrımdan sonra alınır. Test modlarının geçici profilleri korunur.
- Güncelleme kontrolü Next önizlemesinde devre dışıdır; yükleyici indirme işlemi ağ isteğinden önce durur. Kaynak adresi ayrı `claudian-next` deposudur. Eski uygulamanın yayınlarına geri dönüş yoktur. Gelecek kanal açılırken önsürüm seçimi, sürüm karşılaştırma ve checksum desteği birlikte tamamlanmalıdır.
- Next kaldırma işlemi eski sürümle ortak AI yapılandırmalarını otomatik kaldırmaz. `--purge` de işlem yapmadan hata verir. Notlar ve profil saklanır; bu geçici sınır nihai kaldırma deneyimi değildir.

## Henüz çözülmemiş ortak alanlar

AI hesapları, MCP kayıt adları, kullanıcı ana dizinindeki skill/rule/hook dosyaları ve seçilen vault hâlâ ortak olabilir. Yeni profil bu dosyalar için sahiplik/migration üretmez. Bu işlemler açılırsa eski kayıtlara dokunma riski bulunduğundan normal önizlemede aşağıdaki kapı uygulanır. **Tam yan yana kullanım kabulü verilmedi**; gerçek hesapta kurulum/onarım çalıştırılmadı.

Normal Next önizlemesinde mutasyonlar artık kapalıdır. IPC yalnız açıkça listelenen okuma/görüntüleme ve Next'in kendi tercih işlemlerine izin verir; yeni tanımlanan bir işlem varsayılan olarak engellenir. Kurulum, onarım, kaldırma, protokol benimseme, klasör taşıma, connector açma/onaylama/dışa aktarma, AI/CLI başlatma, test/ilk tarama ve Obsidian kaydı bu kapıdan geçemez. Açılıştaki otomatik upgrade, kalıntı temizliği, relay yeniden bağlanması ve periyodik not bakımı da çalışmaz. Snapshot `previewReadOnly` alanını taşır. Bu, ürünün nihai akışı değil; sahiplik geçişi geliştirilirken eski bağlantıları koruyan geçici sınırdır.

Yalnız `--smoke` veya mevcut işaret dosyası doğrulamasını geçen `CLAUDIAN_ACCEPTANCE_ROOT` geliştirme alanında bu kapı açılır. Bu modlar genel amaçlı işletim sistemi sandbox'ı değildir; gerçek hesap/uygulama açma izni veya tam izolasyon kanıtı sayılmaz. Bu turda ikisi de çalıştırılmadı.

K9'un kapanması için her host dosyasında sahiplik ve önceki içeriğin korunması, açık geçiş onayı, yarım geçişten dönüş, doğru sürümün kaldırılması ve eski sürümün aynı cihazda çalışması kanıtlanmalıdır. Paket/installer derlemesi ve Windows üzerinde iki kurulum kabulü ayrıca yapılacaktır.

## Dar doğrulama

16.09: profilsiz normal önizleme de doğrudan paneli açar; bağlantı kurulduğu veya notlara erişildiği iddiası yoktur. Önceki setup ekranı önizleme kapısı nedeniyle ilerleyemiyordu. Kurulum/hesap değişikliği kapısı açılmadı. Mevcut Core oturumunu sürdürme IPC'si de bu kapının arkasındadır.

`node --test test/next-isolation.test.cjs`: ayrı paket kimliği, kilitten önce profil ayrımı, güncellemenin ağa çıkmadan durması, kaldırmanın ortak kayıtlara erişmemesi. Bu kontroller gerçek hesap/installer kabulünün yerine geçmez.
