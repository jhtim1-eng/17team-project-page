# 이화사거리에서 혜화동로터리까지 — 17조 대학로 자율주행 프로젝트 페이지

성균관대학교 자율주행인공지능및제어 17조 프로젝트 페이지입니다.

- 페이지: GitHub Pages 로 이 저장소의 루트(`index.html`)를 공개합니다.
- 코드: <https://github.com/junyeounyang/17team_FINAL/tree/final>

## 들어 있는 것

| 경로 | 내용 |
|---|---|
| `index.html`, `styles.css`, `app.js` | 페이지 |
| `assets/videos/` | 최종 모델을 sumo-gui 에서 주행시키며 녹화한 영상 (전 구간 + 장면 5개) |
| `assets/images/real_map_*.png` | 실제 지도 (© OpenStreetMap contributors, ODbL) |
| `assets/images/sumo_gui_*.png` | 같은 범위의 SUMO-GUI 화면 |

영상·지도 그림을 다시 만드는 스크립트는 코드 저장소의 `docs/tools/` 에 있습니다.

## 로컬에서 보기

```bash
python -m http.server 8000
# http://localhost:8000
```
