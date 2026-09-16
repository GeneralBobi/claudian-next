# İlk yerel akış — 1.0.0-alpha.2

## Ürün gerekçesi

Ortak hafıza kullanıcıya ait Markdown'da kalır. Kullanıcı teknik bağlantı dosyası düzenlemez; aynı bilgiyi AI'lara yeniden anlatmak zorunda kalmaması hedeflenir. Karakterli panel bu çekirdeğin yerine geçmez. Bu dilim iki somut boşluğu kapatır: çift Claude kaydı ve kullanıcı karşılığının yalnız panelde gizlenmesi.

## Yerel Claude kurulumu

Normal Next önizlemesinde yalnız Claude Desktop yerel kurulum yolu açıldı. Hafıza ekranından kurulum başlar; seçili klasör ve okuma/yazma kapsamı onay ekranında gösterilir. Next artık Claude'un global JSON dosyasına ikinci bir sunucu yazmaz; `claudian-next-memory` adlı ayrı MCPB hazırlanır. Eski uygulamanın JSON ve extension kayıtları korunur. Bu koruma eski/yeni araçların aynı sohbette birlikte kullanılmasını önlemez; kullanıcı Next bağlantısını seçmelidir.

Hazırlanan paket doğrudan uygulamadan Claude penceresine sürüklenebilir. Son onay Claude'a aittir. Dosya yolu panoya dayatılmaz; alternatif olarak hazır dosyayı gösterme yolu vardır. Bu, Anthropic'in [belgelenmiş MCPB yükleme yollarından](https://claude.com/docs/connectors/building/mcpb) biridir. Sürükle-bırak ve Claude onayı gerçek kullanıcı ortamında henüz denenmedi.

Dosya/sürüm/etkinlik kanıtı bulunmadan erişim testi öne çıkarılmaz. Paketin hazır olması AI'ın araçları çağırdığını kanıtlamaz. Profil kaldırılırsa çalışan sunucu sonraki araç çağrısında yetkiyi reddeder; eski uygulamanın kaydı silinmez.

Diğer AI kurulumları ve uzak hesap işlemleri göç kapısının arkasında kalır. Yeni `local-preview.cjs` yalnız Claude'a ait hazırlanmış plan kimliğine ve ilgili host işlemlerine izin verir. Genel kapı kaldırılmadı. Bu alpha bütün sağlayıcılarda genel kurulumun tamamlandığı anlamına gelmez.

## Gerçek kaynak karşılığı

Yol arkadaşında açık madde artık kullanıcı tarafından tamamlanabilir veya metni/tarihi tek satır olarak düzeltilebilir. Önce yazma kapsamı ve seçili klasör, sonra mevcut satır ve not hash'i kontrol edilir. Ortak store yedek/makbuz/yeniden okuma ile yazar; UI yalnız committed makbuzdan sonra onay verir. Sonraki okumada eski madde bulunmaz. Gizle/sonra yine yalnız sunum davranışıdır.

Bu dilim doğal dil çıkarımı, beklenti üretimi veya bağlı diğer notların anlamlı güncellenmesi değildir. Kullanıcının açıkça değiştirdiği tek kaynağı günceller; tam bağlam motoru açık kalır.

## Teknik teslim

### Klasör ve gerçek MCP kanıtı — 16.09 devamı

Yerel Claude akışında klasör değiştirme açıldı. Extension seçili klasörü profilden çözer; eski Claude filesystem izinlerine dokunulmaz. Eski klasör kanıtı yeni klasörde geçmez. Açık AI sürecinin eski klasöre yazması sunucu tarafından reddedilir; arayüz yeniden başlatmayı açıkça ister. Notlar taşınmaz veya silinmez.

Bağlantı testi ve ilk tarama yalnız extension'ın MCP gönderimiyle onaylanır. Başka bir uygulamanın yerel yanıt dosyası yazması yeterli değildir. Bu değişiklikleri kapsayan 7 hedefli kontrol geçti; gerçek hesap kabulü yapılmadı.

Ortak profil yazarları reentrant kilit ile sıralandı; farklı süreçlerin kilidi çalınmaz. Ayrıntı: [profil değişiklikleri](PROFILE-MUTATIONS.md). Windows protokol şablonlarında satır sonu tutarlılığı düzeltildi. 255 birim kontrolü geçti; sonraki dar yerel-akış/izolasyon/protokol kontrolleri 11/11 geçti. Windows `win-unpacked` paketi üretildi. Bu testler gerçek hesap veya kullanıcı kabulü değildir. 1.0.0 final yayını henüz yapılmadı.
