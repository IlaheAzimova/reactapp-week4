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

## Checkpoint 3: Qlobal State İdarəetməsi (Context API + useReducer)
Burada komponentlər arası məlumat ötürülməsini səliqəyə salmaq üçün qlobal state mexanizminə keçdim.  MediaContext yaradaraq React-in useReducer hook-unu tətbiq etdim.

Bütün media siyahısı, yeni elementin əlavə olunması və favorit icon  dəyişdirilməsi kimi əməliyyatları artıq səhifənin daxilində deyil, mərkəzi reducer funksiyasında idarə edirəm.

Dashboard səhifəsində custom useMedia hook-u vasitəsilə bu qlobal state-ə qoşulub məlumatları rahatlıqla çəkir və yeniləyirəm.

##  Checkpoint 4: Form Validasiyası 
Login və yeni media əlavəetmə formalarında ciddi validasiya yoxlamaları (boşluq, simvol uzunluğu və email formatı) tətbiq etdim.
İstifadəçi səhv məlumat daxil etdikdə xəta bildirişləri görünür və düzgün yazmağa başlayan kimi avtomatik təmizlənir.

## Checkpoint 5- CRUD emeliyyatlari
 Məlumatları Mock API-yə bağlamışam. İstənilən vaxt yeni şeylər əlavə edə bilirəm (POST), siyahını çəkirəm (GET), favorite iconunu dəyişirəm (PUT/PATCH) və silirəm (DELETE).

 Sil düyməsinə və ya əlavə et-ə basanda serveri gözləmirəm, interfeys dərhal özü yenilənir ki, sürətli işləsin.

Context API & useReducer: Hər şeyi bir yerdə saxlamaq üçün Context və useReducer-dən istifadə etmişəm ki, kod qarışmasın.

Serverdə nəsə problem olub çökən olmasın deyə try-catch ilə hər şeyi nəzarətdə saxlamışam.

## Checkpoint 6- Error Boundary
Layihəyə ErrorBoundary komponenti əlavə etmişəm. Hər hansı alt komponentdə gözlənilməz JavaScript xətası baş verdikdə bütün tətbiqin çöküb ağ ekran verməsinin qarşısı alınır. componentDidCatch və getDerivedStateFromError metodları vasitəsilə xəta tutulur və istifadəçiyə səliqəli bir xəta ekranı ilə yeniləmə düyməsi təqdim olunur.