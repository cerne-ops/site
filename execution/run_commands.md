# Comandos de execução local

## Instalação
```bash
npm install
```

## Desenvolvimento (porta padrão desta operação)
```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

## Build de produção
```bash
npm run build
```

## Preview local do build
```bash
npm run preview
```

## Observações
- Se ocorrer erro de permissão de porta (`EPERM`), executar o servidor fora do sandbox/restrição local.
- Se a porta `4173` estiver em uso, trocar para `4174` mantendo o mesmo padrão de comando.
