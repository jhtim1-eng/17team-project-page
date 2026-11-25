# 17조 프로젝트 페이지 수정 및 GitHub Pages 배포 안내

`docs/index.html` 과 `docs/style.css` 는 보호 대상 파일(`PROTECTED.sha256`)을 전혀 건드리지 않고 GitHub Pages 로 바로 공개할 수 있도록 만든 학회 논문형 프로젝트 페이지 틀입니다.

---

## 1. 최종 제출 전 채워 넣을 항목 체크리스트 (`docs/index.html`)

페이지 안에서 보라색 **`이름 입력` / `영상 삽입 위치` / `이미지 교체` / `입력 예정`** 배지(`class="todo-tag"`)가 붙은 부분만 실제 값으로 바꾸면 완성됩니다.

1. **필수 링크 4종 한 번에 연결 (`docs/index.html` 18~23번째 줄 `window.PROJECT_LINKS`)**
   - `github`: 팀 최종 GitHub 저장소 URL
   - `slidesPdf`: 발표 자료 PDF 링크
     - **가장 안전한 방법 (로그인 문제 0%)**: 발표 PDF 파일을 `docs/assets/slides_team17.pdf` 로 넣으면 별도 구글 드라이브 권한 설정 없이 누구나 클릭 즉시 열립니다.
   - `huggingface`: 팀 Hugging Face 데이터셋 URL (`https://huggingface.co/datasets/...` — Visibility 가 **Public** 인지 꼭 확인)
   - `videoSection`: 기본값 `#demo-video` (페이지 내 영상 섹션으로 스크롤) 또는 YouTube 링크
2. **팀원별 세부 역할 매핑 (선택, `docs/index.html` 약 75~92번째 줄)**
   - 팀원 성함(`양준연 · 이준서 · 곽재현`)과 소속(`성균관대학교`)은 반영되어 있습니다. 역할 카드 4칸에 각 담당자 이름을 함께 적고 싶다면 해당 블록에서 바로 덧붙이면 됩니다.
3. **시뮬레이션 주행 영상 (30초 이상 권장)**
   - `docs/assets/videos/main_drive.mp4` 에 영상을 넣고 `docs/index.html` 의 `<video controls ...>` 주석을 해제한 뒤 바로 아래 `<div class="video-placeholder">...</div>` 블록을 삭제합니다.
   - 용량이 100 MB 를 넘어 GitHub 에 올리기 부담스러우면 YouTube **일부공개(Unlisted) 또는 전체공개(Public)** 로 업로드한 뒤 `<iframe src="https://www.youtube.com/embed/영상ID" allowfullscreen></iframe>` 으로 넣어도 됩니다.
4. **실제 도로 vs SUMO 스크린샷 (`docs/assets/images/`)**
   - `real_daehakro.png`, `sumo_daehakro.png` 를 넣고 `<div class="img-placeholder">...</div>` 자리를 `<img src="assets/images/real_daehakro.png" style="width:100%; border-radius:8px; margin-bottom:0.75rem;" alt="실제 대학로" />` 로 교체합니다.
5. **최종 정량 비교표 (`docs/index.html` `#results` 표)**
   - 현재 `Hybrid BC` 와 `Hybrid BC + PPO` 의 **1,500 에피소드 실측 집계 수치**는 이미 정확히 반영되어 있습니다.
   - 역할 ① 순수 PPO 최종 1,500판 결과와 `bchw_s20` / `c638_end_k3` 1,500판 결과가 완료되면 `[TBD]` 칸을 채워 넣습니다.

---

## 2. 로컬에서 미리보기

브라우저에서 `docs/index.html` 파일을 더블클릭해 바로 열거나, 터미널에서 아래 명령으로 확인합니다.

```powershell
python -m http.server 8000 --directory docs
```
이후 브라우저에서 `http://localhost:8000` 접속.

---

## 3. GitHub Pages 배포 방법 (1분 설정)

1. `docs/` 폴더를 포함해 GitHub 저장소 `main` 브랜치에 `git push` 합니다.
2. GitHub 저장소 상단 **Settings → Pages** 메뉴로 이동합니다.
3. **Build and deployment** 아래:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / 폴더는 **`/docs`** 선택 → **Save** 클릭
4. 1~2분 뒤 `https://<계정명>.github.io/<저장소명>/` 주소가 생성됩니다.
5. 시크릿 창(로그아웃 상태)에서 **코드 · PDF · Hugging Face · 주행 영상** 4개 버튼이 모두 로그인 없이 열리는지 확인합니다.
