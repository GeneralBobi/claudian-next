# Bağlantı kanıtının kapsamı

16.09 kaynak düzeltmesi: masaüstü doğrulaması da MCP test araçlarıyla aynı etkin test kontrolünü kullanır. İstek doğru host, seçili klasör, beklenen yanıt yolu, protokol sürümü ve 30 dakika sınırı içinde olmalıdır. Mevcut yazma izni yoksa eski yanıt başarılı sayılmaz. Eski sürümden kalan sürümsüz istek için yeni test gerekir.

Durum ekranı klasör kayıpken veya erişim salt okunura değişmişken geçmiş okuma/yazma kanıtını güncel başarılı durum olarak göstermez. Geçmiş tarih korunur. Doğrulama sırasında profil değişirse yeniden okuma karşılaştırması eski profilin yazılmasını reddeder.

Hedefli regresyon: geçerli cevap; değişen klasör/izin/protokol; süresi dolmuş istek; dış yanıt yolu; doğrulama esnasındaki izin değişimi. Bunlar geçici test klasöründe çalıştırıldı; gerçek hesap kabulü yapılmadı.

16.09 devamında `MemorySetup` profil yazarları ortak reentrant kilide bağlandı; bkz. [profil değişiklikleri](PROFILE-MUTATIONS.md). Kilide katılmayan harici yazıcılar ve farklı profillerin ortak host dosyaları hâlâ ayrı sınırdır. Gerçek klasör geçişi kabulü tamamlanmış sayılmaz.
