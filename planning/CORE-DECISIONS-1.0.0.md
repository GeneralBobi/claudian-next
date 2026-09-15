# Ortak hafıza çekirdeği — 1.0.0 kararları

Durum: kaynak incelemesiyle verilmiş mimari kararlar; canlı kabul veya uygulandı beyanı değildir. Amaç, kullanıcının zaten kullandığı AI içinde aynı sahipli ve taşınabilir hafızayı kullanmasıdır. Kaynak karşılaştırması 15 Eylül 2026 tarihinde yapıldı. Özel notlar ve hesap verileri bu belgeye alınmadı.

## K3 — Çalışan davranışı koru, kişisel sabitleri taşıma

**Karar:** 0.18.7'deki genel not deposu ve ortak MCP yetenekleri temel alınacak. Kişisel Core yeniden paketlenip olduğu gibi halka dağıtılmayacak; davranış referansı olacak. Yeni bir hafıza motoru veya ikinci not veritabanı gerekmiyor.

| Davranış | Çalışan referansın kaynak kanıtı | Fork'ta karşılığı ve karar |
| --- | --- | --- |
| Seçili vault sınırı | `claudian-skill/server/index.js:164,220`: gerçek yol doğrulaması | `memory-store.cjs`: sınırlandırılmış Markdown deposunu koru; klasör seçiminde profil, yetki ve gerçek araç hedefinin birlikte değişmesi kabul koşulu |
| Güvenli düzeltme | Aynı dosya `:347–388,482–529`: yedek, geçici dosya, hash kontrollü patch/append | `memory-store.cjs:112–134`, `memory-capabilities.cjs:47–49`: yedek + hash + yazdıktan sonra yeniden okuma mevcut; yeniden yazma gerekçesi yok |
| İlk bağlam | Aynı dosya `:28–42,435`: ortak giriş ve yüzey adaptörü | `memory-runtime.cjs:35–62`, `roles.cjs`: rol bazlı çözümleme korunur; kişisel isimli zorunlu notlar ve persona sabitleri aktarılmaz |
| Seçici kayıt | Dar read/search/patch/create/append araçları | `memory-capabilities.cjs`, `memory-capture.cjs`: mevcut notu güncelle, yeni kalıcı bilgi için doğru yere kayıt ve bağlantı; ham sohbet ve zorunlu kayıt kotası yok |
| Taşınabilir veri | Markdown dosyaları | Not içeriği kullanıcı klasöründe kalır. Operasyonel makbuzlar kişisel bilgi diye diğer AI'a taşınmaz |

Kişisel sunucunun giriş notları ve koruma listesinde kişiye özgü dosya adları var (`server/index.js:14–42`). Bunun genel role dönüştürülmüş karşılığı zaten mevcut. Eski tool adları da farklıdır: var olan hesapta eski Core bulunması yeni test araçlarının bulunduğunu kanıtlamaz. Geçiş bu farkı algılamalı; kullanıcıya iki aynı adlı bağlantı arasında tahmin yaptırmamalı.

## K4 — Tek hafıza davranışı, iki erişim yolu

**Karar:** Yerel masaüstü entegrasyonu ile uzak hesap bağlantısı aynı `memory-capabilities.cjs` ve `memory-store.cjs` sözleşmesini kullanacak. İki yol ürün içinde ayrı kurulum yükü gibi sunulmayacak; seçilen AI yüzeyine göre gereken yol hazırlanacak. Katalog/hesap dağıtımının sağlayıcıya bağlı kısmı dağıtım kararıdır; yeni hafıza motoru gerektirmez.

- Yerel paket: sağlayıcının yerel araç çalıştırabildiği yüzeyde seçili klasöre sınırlı erişim. Yerel paket kurulumu web/mobil bağlantısı sayılmaz.
- Uzak yol: `remote-connector.cjs:13,26–54` profil seçili klasörüyle relay bağlantısını yeniden başlatıyor. `remote-http.cjs:43–47` aynı yetenekleri üretiyor ve işlem sırasında klasör değişimini reddediyor. Bu parçalar korunacak; kullanıcıya relay URL'sini ziyaret ettirme, sunucu çalıştırma veya terminal komutu verme olağan akış olmayacak.
- Eski `Claudian_app/run.bat:199–225` web sunucusu, worker ve cloudflared çalıştırıyordu. `app/api/mcp/route.ts:125–142,245–297` hesabın yetkilerine göre araç çalıştırıyor. Bu çalışan uzak erişim davranışı referanstır; eski sabit alan adı ve eski OAuth kimliklerini yeni üründe otomatik geçerli saymak değildir.
- Mobilde aynı hesap uzak bağlantısı hedeflenir; gerçek mobil yüzey kabulü ayrı gerekir. Bilgisayar kapalıyken yerel dosyayı relay erişilebilir kılmaz. Bu aşamada sessiz bulut kopyası veya yeni barındırma maliyeti eklenmez.

**Geçiş sınırı:** Eski bağlantı adı, araç sürümü ve klasör hedefi saptanır; yeni yol çalışmadan eski bağlantı kaldırılmaz. Her yeni kullanıcı kendi klasör erişimini onaylar. Paylaşılan entegrasyon paketi, geliştiricinin kişisel yetkisini paylaşmak değildir.

## K5 — Erişemeyince haber ver; kural araç dışında da bulunmalı

**Karar:** İlk mesajda erişim varsa sessiz hazırlık; araç hiç yüklenmemiş olsa da erişim yoksa aynı yanıtta bir kısa bildirim. Başarılı okuma/yazma duyurulmaz. MCP içindeki yönerge tek başına bu davranışı sağlayamaz: MCP yokken de ulaşılabilen sağlayıcı talimatı gerekir.

0.18.7 kaynak sapması `policy.cjs` içindeki `memoryTrigger` TR/EN metniydi: araç tamamen yoksa susmayı söylüyordu. Fork içinde bu tur `memoryTrigger`, yorumları ve TR/EN protokolü 2.8.1 olarak düzeltildi; yeni üretilen adaptör teklifleri düzeltilmiş metni kullanır. Dosya tabanlı `instruction` zaten erişim hatasını bildiriyordu. **Kaynak düzeltmesi uygulandı; hesap göçü ve canlı davranış kabulü açık.** Yeni metin üretmek, daha önce hesap hafızasına kaydedilmiş metni güncellemiş sayılmaz.

Kurulum, yüzeyin gerçekten desteklediği kalıcı talimat yolunu kullanmalı; yetki verilebilen yerde üründen kurmalı, sağlayıcının zorunlu onayında kullanıcıya hazır değişikliği sunmalı. Önceden kaydedilmiş eski susma satırı için yalnız Claudian'a ait metin değiştirilir; kişinin diğer özel talimatları korunur. Böyle bir yüzey yoksa otomatik başlangıç desteği vaat edilmez. Kalıcı talimat da model davranışına mutlak uyum garantisi değildir; selamlaşma kabulü gerekir.

## K8 — Hafıza bakımını koru, her tur muhasebesini amaç yapma

**Karar:** Her tur kalıcı bilgi olup olmadığını değerlendirme davranışı korunacak. Değişiklik yokken zorunlu `begin_memory_turn` / `memory_review(NO_OP)` çağrısı ve buna bağlı yanıt engelleme 1.0.0'ın ortak varsayılanı olmayacak. İşlem makbuzu, yetki denetimi, hash kontrolü ve yazma başarısızlığı bildirimi korunur. Mevcut hook dosyaları topluca silinmez; gerekli olduğu kanıtlanan yüzey adaptöründe isteğe bağlı olarak kalabilir.

Dayanak: `memory-runtime.cjs:7–9` her tur review zorunluluğu ekliyor; `memory-capabilities.cjs:25–27` turn açma/review araçlarını sunuyor; `memory-hook.cjs:12–33` cevap sonrasında eksik review nedeniyle engelleyebiliyor. `memory-runtime.cjs:91–92` eski turn/farklı bağlantıyı reddediyor. Bu güvenlik kontrolü gevşetilmez; normal hafıza kullanımı operasyonel tur törenine bağımlı kılınmaz.

İlk bağlam şu anda beş rol notunu, uygulama protokolünü ve vault protokolünü birlikte döndürüyor (`memory-runtime.cjs:39–57`). Yeni giriş kısa davranış özeti, gerekli kullanıcı sınırları ve giriş haritasıyla başlamalı; ilgili notlar ihtiyaç olduğunda okunmalı. Eş içerikli protokol iki kez döndürülmemeli; vault özelleştirmeleri asla sırf küçültmek için atılmamalı. Büyük not için tam okuma gerekliliği açık kalmalı.

Sayısal token hedefi ölçülmeden icat edilmez. Sonraki kabul aynı kısa/genel ve uzun/projeli konuşmada dönen bağlam miktarını, araç çağrılarını ve doğru kalıcı kayıtları karşılaştırmalı. Ölçüm ürünün uzun sohbet hafızasını koruduğunu göstermek içindir; bu belge test çalıştırıldığı anlamına gelmez.

## Uygulama ve denetim sınırı

Ortak hafıza veri/işlem sözleşmesi korunur; `startup_context` üzerinden dinamik davranış protokolü döndürmenin resmî dizin dağıtımıyla uyumu henüz kurulmuş değildir. [Dağıtım araştırmasındaki](DISTRIBUTION-1.0.0.md) dizin hedefinde davranışın sürümlü, sağlayıcının kabul ettiği sabit talimat/yetenek yüzeyinde taşınması gerekir; kullanıcı notları veri olarak kalır. Bu dönüşüm, erişim yok bildirimi ve seçici bakım için eşdeğer bir başlangıç yolu sağlamadan kişisel davranışı kaldırmak anlamına gelmez. Core'u yeniden kullanma kararı katalog kabulü değildir.

Bu kararlar kaynak eşlemesini ve en küçük ortak mimariyi belirler. K3–K5/K8 için kod değişikliği, eski hesap kuralı göçü, mobil kabul ve maliyet ölçümü ayrıca gerçekleştirilmelidir. Sağlayıcının dağıtım/izin koşulları kapanmadan bu belge tek tuş kurulumun hazır olduğunu söylemez. Başarı: bir AI'ın doğru kaydını başka AI'ın gerektiğinde kullanması; kurulu bileşen veya hook sayısı değil.
