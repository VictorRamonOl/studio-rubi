# Agenda do Studio Rubi — Regras de Negócio

Extraído do script atual (Google Sheets + Calendar) + novos requisitos da Rubia.

## 1. Regras que JÁ existem no seu script (vamos manter)

- **Pacote recorrente**: ao cadastrar, escolhe os **dias da semana** (ex: SEG, QUA)
  e um **horário fixo** (texto "HH:MM"). A agenda é gerada automaticamente nesses
  dias/horário.
- **Fim da recorrência** = o que vier **primeiro**: `início + 30 dias` **OU**
  `nº de sessões do pacote` (padrão 8).
- **Cortesia**: cada pacote tem **1 remarcação cortesia** (não desconta sessão).
- **Baixa de sessão**:
  - Presença → desconta **1 sessão**.
  - Falta **com** cortesia disponível (remarcar cortesia) → desconta **1 cortesia**, não a sessão.
  - Falta **sem** cortesia / sem justificativa → desconta **1 sessão** (*falta = sessão dada*).
- **Renovar pacote**: cria um novo período (P001-0001 → P001-0002), zera a agenda,
  novo ciclo de 30 dias / 8 sessões.
- **Cancelar pacote**: remove a agenda daquele pacote.
- **Conflito de horário**: ao gerar, checa se o horário já está ocupado.

## 2. Regras NOVAS que a Rubia quer

- **Agenda auto-bloqueada pelo pacote**: ao colocar o paciente num dia/horário,
  aquele slot fica reservado (recorrente) — a agenda preenche sozinha.
- **Capacidade por horário depende do TIPO de pacote**:
  - **Pilates em grupo** → até **3 pacientes** no mesmo horário.
  - **Individual / Fisioterapia / Home care** → **1 paciente** por horário.
- **Profissionais** (hoje 2: Rubia + 1 fisio, talvez +1): cada paciente/agenda
  fica **vinculado a uma profissional**.
- **Agenda compartilhada** entre as profissionais, numa visão só, **sem choque de
  horário** (respeita a capacidade de cada uma).
- **Home care**: a Rubia atende na casa do paciente — registrar também (ocupa o
  horário dela, marcado como "em domicílio").
- **Disponibilidade ao remarcar**: quando alguém quer remarcar, o sistema mostra
  se **tem vaga** naquele horário (ocupação < capacidade) ou não.

## 3. Modelo proposto (dentro do app)

**Tipo de pacote** (`package_types`): + `modalidade` (pilates_grupo | individual |
fisio | homecare) e + `capacidade` (3 p/ grupo, 1 p/ resto).

**Pacote** (`packages`): + `profissional`, + `dias_semana` (ex: SEG,QUA),
+ `horario` ("HH:MM"), + `duração`, + `cortesia_total`/`cortesia_usada`. O
vencimento já existe (due_date = início + 30d).

**Sessões** (`sessions`, já existe): geradas automaticamente a partir do pacote
(recorrência), cada uma vinculada à **profissional** e ao **slot** (data+hora).

**Slot e vaga**: um horário de uma profissional comporta N pacientes
(N = capacidade do tipo). Tem vaga se `sessões no slot < capacidade`. É isso que
valida agendamento, remarcação e evita choque.

**Remarcação**: paciente pede → app mostra à Rubia os horários **com vaga** →
ela aprova movendo pra um slot livre.

## 4. Decisão em aberto: Google Calendar

- **Opção A (recomendada)** — agenda **dentro do app**: controla capacidade,
  desconto de sessão, cortesia, remarcação pelo portal e disponibilidade tudo
  junto e automático. Opcional: **sincronizar** com o Google Calendar depois (pra
  Rubia ver no celular).
- **Opção B** — continuar dependendo do Google Calendar como hoje (menos controle,
  capacidade e portal ficam difíceis).
