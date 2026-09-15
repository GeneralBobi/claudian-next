# 1.0.0 — Gerçek dağıtım ve bağlantı kararı

İnceleme: 15 Eylül 2026. Resmî doküman araştırmasıdır; canlı hesap kabulü veya yayımlanmış Claudian entegrasyonu kanıtı değildir. Ana planın K1/K2/K4/K5/K7 kararlarına dayanak sağlar. Hesap, ülke ve uygulama sürümü koşulları yayın öncesi tekrar kontrol edilir.

## Ürün kararı

**Ortak, yayımlanabilir Claudian entegrasyonu hazırlamak bizim işimiz; kullanıcının kendi notlarına erişimi onaylaması kullanıcının işi.** Her kullanıcıya connector geliştiricisi gibi form doldurtmak genel ürün akışı olamaz. Ortak paket kullanıcıların aynı notları veya kimlik bilgilerini paylaşması anlamına gelmez.

Hedef dağıtım iki yoldur: yerel yüzeylerde sürümlü kurulum paketi; web/mobil yüzeylerde ortak entegrasyon kaydı ve kullanıcıya özel yetkilendirme. Uzak bağlantının kullanıcıya ait cihaz/vault seçimini sunucu tarafında güvenilir biçimde eşlemesi gerekir. Sabit ortak adres tasarım hedefidir; eski cihaza özel URL'yi yeniden adlandırmak bunu sağlamaz. Sağlayıcı hesabındaki yükleme ve sohbet etkinliği ayrıca doğrulanır.

## Yüzey matrisi

“Hazırlanabilir” aşağıda sağlayıcının dağıtım yolunun varlığını ifade eder; Claudian'ın kabul edildiği veya kullanıma hazır olduğu anlamına gelmez.

| Yüzey | Resmî yol ve temiz hesap gerçeği | 1.0.0 kararı / kalan kapı |
| --- | --- | --- |
| Claude Desktop | Paylaşılabilir `.mcpb`; sağlayıcı içinden kurulum ve ayar ekranı. Genel dizine başvuru mümkün. Node çalışma zamanı sağlayıcıda bulunur. [Yerel kurulum](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop) | **Yerel referans akış.** Ürün paketi ve seçili klasör ayarını hazırlar; kullanıcı kurulum/izin onayı verir. Windows'un bilinmeyen dosya “birlikte aç” penceresi başarı yolu sayılmaz. Otomatik kurulum giriş noktası gerçek cihazda kanıtlanmalı; desteklenmeyen gizli deep link uydurulmaz. |
| Claude web | Uzak connector; özel connector tüm belirtilen tüketici planlarında, Free için bir adet sınırı. Sağlayıcı bulutundan erişilebilir sunucu gerekir. Dizin servisi seçme + onay akışı sunar. [Connector kullanımı](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities) | **Uzak referans akış.** Ortak yayımlanan entegrasyon hedefi; özel connector yalnız açıkça etiketlenen erken kabul yolu. Dizin uygunluğu aşağıdaki önemli kapıya bağlı. |
| Claude mobil | Hesaba web/desktop üzerinden bağlanan uzak servis mobilde kullanılabilir; mobil kurulum beta. Yerel extension web/mobil yerine geçmez. [Yüzey farkı](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors) | Bilgisayar açıkken aynı vault'a gerçek telefondan kabul. Relay, kapalı bilgisayardaki dosyayı erişilebilir yapmaz. |
| ChatGPT web | Genel yayımlama: Apps SDK/MCP uygulamasını incelemeye gönderme, onay sonrası dizin sayfasına doğrudan yönlendirme. [Başvuru](https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/) | **Genel entegrasyon başvurusu ayrı teslimat.** Boş Personal hesabında bizim kişisel uygulamamızın var olduğu varsayılmaz. Developer Mode/custom app genel tüketici kurulumu diye sunulmaz. |
| ChatGPT mobil | Plugin/app uygunluğu yüzey, hesap ve plana bağlı. İçe aktarılan MCP bildirimli plugin, HTTPS kullansa bile Desktop only olabilir; app referansı eklemek tek başına kaldırmaz. [Güncel plugin sınırları](https://help.openai.com/en/articles/20001256/) | Yayımlanan app'in gerçek mobil okuma/yazma kabulü yapılmadan destek rozeti yok. Yerel Codex paketinin mobil ChatGPT'de çalışacağı söylenmez. |
| Codex | Yerel plugin ve pazar kataloğu; bazı plugin'ler Codex'e özgü. Kurulum ve alttaki app izni ayrıdır. [Plugin modeli](https://help.openai.com/en/articles/20001256/), [resmî manifest kaynağı](https://github.com/openai/codex/blob/main/codex-rs/skills/src/assets/samples/plugin-creator/references/plugin-json-spec.md) | Mevcut Core'u sürümlü yerel pakette dağıt. Hedef Codex Desktop ise kabul o uygulamada; terminalde çalışması Desktop kabulünün yerine geçmez. |
| Claude Code | Sürümlü plugin, Git tabanlı marketplace üzerinden dağıtılabilir; kullanıcı kapsamı bulunur. [Pazar dağıtımı](https://code.claude.com/docs/en/plugin-marketplaces), [kurulum](https://code.claude.com/docs/en/discover-plugins) | Ürün marketplace/paket hazırlığını üstlenir; komut yazdırmak normal kullanıcı akışı olmaz. Claude Desktop içindeki Code ve ayrı terminal oturumu kabulde ayrılır. |
| Gemini web / Spark | Güncel belge özel MCP uygulamalarını hem Spark iş akışları hem sohbet eylemleri için anlatıyor. ABD, 18+, kişisel hesap, etkin Keep Activity ve İngilizce koşulları var. Webden eklenir, ardından web/mobilde kullanılabilir. Yazma eylemleri elle onay ister. [Google özel uygulamalar](https://support.google.com/gemini/answer/17209137?co=GENIE.Platform%3DDesktop&hl=en) | **Koşullu entegrasyon.** Normal Türkçe Gemini hesabına koşulsuz vaat yok; eski “yalnız Spark” ifadesi güncel gerçekle karıştırılmaz. Genel dizinde paylaşılabilir Claudian yayını/tek adım kurulum yolu bu araştırmada kanıtlanmadı. Uygunluk yoksa test başlatılmaz. CLI'ya yönlendirerek Gemini web bağlandı denmez. |
| Antigravity | Plugin; `plugin.json`, MCP ve isteğe bağlı rules/skills; sağlayıcı belirlenmiş yerel/global dizinleri tarar. [Resmî plugin biçimi](https://antigravity.google/docs/plugins) | Yerel hazırlık ürünce otomatik yapılabilir; IDE ve CLI ayrı profil/kabul. Google hesabı doğrulaması ve araç yetkisi başarıdan ayrı. Gemini web karşılığı değildir. |
| Perplexity web | Özel uzak connector formu, OAuth ve Streamable HTTP; kişisel kayıt yalnız sahibine görünür, organizasyon paylaşımı yöneticiye bağlı. Güncel kaynak Enterprise bağlamında; tüketici Free/Pro kapsamını kesinleştirmiyor. [Resmî uzak connector](https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors) | **Koşullu entegrasyon.** Free hesapta olmayan düğmeyi aratma yok. Genel tüketiciye paylaşılabilir dizin başvurusu/kurulum linki kanıtlanmadı; manuel formu tek tuş diye sunma. Uygunluk ve dağıtım kapısı kapanana kadar tam destek değil. |

## Genel dizin yayınına özgü kritik kapı

Anthropic dizin politikası, Claude'un hesap hafızası/geçmişi/özetleri ve kullanıcı dosyalarından sorgulama veya çıkarımı kısıtlıyor; dış kaynaktan dinamik davranış talimatı çekmeyi de yasaklıyor. Gizlilik politikası, doğrulanabilir iletişim ve inceleme hesabı istiyor. [Dizin politikası](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)

**Çıkarım:** Eski “sağlayıcı hafızasını tara, startup_context'ten gelen protokolü uygula” akışı değiştirilmeden dizin onayı vaat edilemez. Claudian'ın kullanıcının seçtiği bağımsız Markdown hafızasını yönetmesi ile Claude'un özel hesap geçmişini çıkarması ayrı davranışlardır. Dizin sürümünde sabit, görünür ve sürümlü davranış talimatı; dar araç tanımları; sadece gereken not verisi kullanılmalı. Bağımsız vault'a seçici kayıt kapsamının kabulü ve mevcut ilk tarama tasarımının uygunluğu sağlayıcı başvurusunda netleştirilmeli. Bu, kişisel vault kullanımının bütünüyle yasak olduğu iddiası değildir; genel dizin dağıtımının açık kapısıdır.

ChatGPT tarafında da bir workspace'e plugin paylaşmak genel dizin yayını değildir. İzin, kurulum ve sohbet içi kullanım birbirinden farklıdır. Gerekli durumlarda uygulamanın sohbetten seçilmesi kullanıcıya gösterilir; her yeni sohbette otomatik yükleneceği vaat edilmez. [OpenAI plugin modeli](https://help.openai.com/en/articles/20001256/)

## Referans ve uygulanacak sıra

1. **Claude Desktop yerel paketi**: mevcut çalışan yöntemi temiz cihazda kolay kurulabilen dağıtıma dönüştür. Başarı ölçütü paket dosyasının varlığı değil, kullanıcının yol/JSON/komut yazmadan doğru vault'a ulaşmasıdır.
2. **Claude uzak bağlantı + mobil**: aynı not davranışı; genel entegrasyon dağıtımı ve kişiye özel erişim eşlemesi. Bu ikinci kabul tamamlanmadan yerel başarıyı mobil vizyon tamamlandı diye sunma.
3. **ChatGPT genel uygulama dağıtımı**: referansla paralel başvuru hazırlığı; onay zamanı bizim kontrolümüzde olmadığından kod bitişiyle birleştirilmez. Kullanıcıya ait hesap işlemleri ayrı kabul oturumunda.
4. Codex / Claude Code / Antigravity paketlerini aynı çekirdeğe bağla. Yeni hafıza motorları üretme. Gemini ve Perplexity'yi kapsamdan sessizce silme; uygunluk ve dağıtım engellerini seçilmeden önce görünür tut.

## Kapanış kanıtı

Bu araştırma resmî dağıtım yollarını ayırır; K1/K2'yi bütünüyle kapatmaz. Açık kalan somut kanıtlar: Claudian dizin onayı ve gerçek genel kurulum linkleri; kişisel connector'ı bulunmayan hesapta kurulum; sağlayıcı engeli olmadan yazma; araçlar yokken talimatın erişilebilirliği; telefon kabulü; Gemini/Perplexity uygun hesap ve dağıtım yolu. Hiçbirine yalnız OAuth kaydı üzerinden yeşil durum verilmez.
