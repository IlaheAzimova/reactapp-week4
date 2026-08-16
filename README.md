## Checkpoint 1: Routing
React Router qurdum və Login ilə Dashboard səhifələri arasında keçidləri təyin etdim.

ProtectedRoute komponenti yazdım ki, sistemə daxil olmayan heç kim birbaşa linki yazıb Dashboard-a girə bilməsin.

Əgər istifadəçinin tokeni yoxdursa, avtomatik olaraq Login səhifəsinə göndərilir.

## Checkpoint 2: Auth axını
Login formasını hazırladım. İstifadəçi email və şifrə yazdıqda localStorage-ə token yazılır və istifadəçi içəri buraxılır.

Səhifəni yeniləyəndə (refresh edəndə) token yerində qalır və istifadəçi sistemdən atmır.

Sistemə artıq daxil olmuş adam yenidən Login səhifəsinə qayıda bilmir, birbaşa Dashboard-a yönləndirilir.

"Çıxış et" düyməsinə basanda localStorage-dəki tokeni silirəm və brauzerin geri düyməsi ilə təkrar Dashboard-a qayıtmağın qarşısını alıram.

Dashboard-da film və kitabları saxlamaq, yenisini əlavə etmək və ulduzla favoritə atmaq üçün ilkin interfeysi qurdum.