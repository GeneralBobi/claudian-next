# Ortak profil değişikliği sınırı

`MemorySetup` profil yazarları aynı dosya anahtarında süreç içinde sırayla çalışır. prepare/install, challenge/verify, preferences/useLanguage, skipVerification, adoptProtocol, sweepResidue, relocate, removeHost ve upgrade kapsanır. Kilit tüm okuma–değiştirme–atomik kaydetme işlemini sarar; yalnız son yazmayı kilitlemek eski anlık görüntüyü korumaya yetmez.

`AsyncLocalStorage` aynı işlemin relocate → upgrade ve useLanguage → preferences çağrılarını kilitlenmeden geçirir. Başka Setup örneği aynı profile yazıyorsa sıraya alınır. Başka süreçteki katılımcı yazar `profile.json.mutation.lock` dosyası nedeniyle açık hata alır. Kilit zaman aşımıyla çalınmaz; kesilmiş işlem kilidi ayrı kurtarma incelemesi gerektirir.

MCP sunucusu ve connection/first-review araçları profili okur; profil yazarı değildir. Not işlemleri kendi hash/makbuz sınırlarını korur. setup-review gibi çok adımlı orchestration her alt işlemi ayrı güvenli işlem olarak yürütür; tamamı tek geri alınabilir transaction değildir. Dışarıdan elle veya eski sürümle doğrudan profil dosyasına yazan süreç bu kilide katılmaz. Bu nedenle mevcut son-profil karşılaştırmaları da korunur. Ayrı profillerin aynı host yapılandırmasını değiştirmesi bu profil kilidinin kapsamı dışındadır; host sahipliği/geçiş işi açık kalır.

Geçici klasörde eşzamanlı iki Setup değişikliği, iç içe çağrı, hata sonrası serbest bırakma ve dış kilidin korunması doğrulanır. Gerçek hesap veya kurulu uygulama değiştirilmez.
