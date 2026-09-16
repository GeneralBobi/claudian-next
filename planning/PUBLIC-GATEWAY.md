# Ortak bağlantı dağıtımı — somut kalan uygulama

16.09 kaynak incelemesi. Mevcut kişisel Core davranışı korunur; kişisel çalışma alanı genel ürünün varsayılanı yapılamaz.

## Yeniden kullanılacaklar

`relay/worker.mjs` cihaz kanalı, `remote-auth.cjs` PKCE/kod/token/izin doğrulaması, `remote-http.cjs` MCP taşıması ve mevcut store. Not içeriği gateway'de depolanmaz. Yerel onay ve güncel vault/erişim kontrolü cihazda kalır.

## Eksik sözleşme

Mevcut relay yalnız `/d/<device>/...` yönlendirir. Ortak issuer, client kaydı ve yetkili token → cihaz eşlemesi yoktur. Kişisel web Core'daki bootstrap ilk workspace'i seçer; o tek kullanıcılı kayıt yolunu public URL yapmak bu eksiği çözmez.

1. Cihazdan bağımsız `/mcp`, OAuth metadata/register/authorize/token uçları.
2. Resource, client, redirect, PKCE ve scope'a bağlı süreli tek kullanımlık yerel eşleme işlemi.
3. Masaüstü onayından sonra grant → cihaz/host/vault kapsamı; token hash'i ve iptal durumu. Cihaz kimliği tek başına izin değildir.
4. Gateway'in yetkilendirdiği isteğin doğru DeviceChannel'a gönderilmesi; cihazın grant ve güncel profili yeniden denetlemesi.
5. Klasör/erişim değişimi, grant iptali ve cihazın kapalı olması için açık hata; başka cihaza fallback yok.
6. Aynı genel entegrasyonun sağlayıcı dağıtım kaydı ve kullanıcıya gösterilecek gerçek kurulum bağlantısı.

## Kabul

İki ayrı sahte cihazla A kodu/token'ı B'ye ulaşamamalı. Eski klasör grant'i çalışmamalı; tekrar kullanılan eşleme, izinsiz scope ve farklı redirect reddedilmeli. Sonraki aşama desktop consent köprüsü, ardından kullanıcının yapacağı gerçek hesap kabulüdür.

Bu belge implementasyon veya yayın kanıtı değildir. Genel entegrasyon onayı, ortak URL altyapısından ayrı açık kalır. Mobilde bilgisayar kapalı erişim bu gateway ile sağlanmış sayılmaz.
