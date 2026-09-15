# K8 — İsteğe bağlı operasyonel tur kaydı

Varsayılan hook yalnız oturumun ilk kullanıcı mesajında kısa bir başlangıç yönergesi verir. Yeni bir operasyonel tur açmaz; Stop yanıtı engellemez, PostToolUse sayaç/tetik üretmez. Kalıcı bilgi değerlendirme, gerçek yazma doğrulaması ve erişememe bildirimi devam eder. Bu davranış modelin gerçekten sürekli bakım yaptığının canlı kabulü değildir.

`begin_memory_turn` ve `memory_review` uyumluluk için durur. İsteğe bağlı başlatılan fakat review verilmeyen tur başarısız yazma sayılmaz; durum geçmişinde `NOT_REVIEWED` olarak kalır. Eski tur, farklı bağlantı ve gerçek committed işlem makbuzu denetimleri korunur. Başka bağlantıya ait oturum begin ile de yeniden sahiplenilemez.

Mevcut tanılama davranışı yalnız profilin `maintenanceReviewRequired: true` seçimiyle korunabilir. Bu tur kullanıcının profilini veya kurulu host hook dosyasını değiştirmedi; otomatik olarak opt-in yapılmadı. Yeni runtime kaynak değişikliğidir; mevcut yayın kendi eski dosyalarını kullanmaya devam eder.

Dar kontroller: tek başlangıç yönergesi; normal Stop/PostToolUse etkisizliği; isteğe bağlı turda sahte başarısızlık üretilmemesi; actor/turn/receipt reddi; açık legacy opt-in. Canlı uzun sohbet ve token ölçümü ayrı kabul olarak açıktır.
