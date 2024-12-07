import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  MenuItem,
  Select,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const proximoId = Math.max(...tarefas.map((tarefa) => tarefa.idTarefa)) + 1;
    setIdTarefa(proximoId);
  }, [tarefas]);

  const handleRecurso = (event) => setRecursoTarefa(event.target.value);
  const handleStatus = (event) => setStatusTarefa(event.target.value);

  const handleSalvar = () => {
    setLoading(true);

    setTimeout(() => {
      setTarefas([
        ...tarefas,
        {
          idTarefa,
          tituloTarefa,
          descricaoTarefa,
          inicioTarefa,
          fimTarefa,
          recursoTarefa,
          statusTarefa,
        },
      ]);
      setLoading(false);
      handleClose();
    }, 2000); // Simula o tempo de envio
  };

  const handlePreview = () => setPreviewOpen(true);
  const handleClosePreview = () => setPreviewOpen(false);

  const handleReset = () => {
    setTituloTarefa('');
    setDescricaoTarefa('');
    setInicioTarefa('');
    setFimTarefa('');
    setRecursoTarefa('');
    setStatusTarefa('');
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader
          title={
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AddCircleOutlineIcon fontSize="large" color="primary" />
              </Grid>
              <Grid item>Tarefas: Cadastro de Tarefas</Grid>
            </Grid>
          }
          subheader="Preencha as informações abaixo para adicionar uma nova tarefa"
        />
        <CardContent sx={{ width: '95%', maxWidth: '100%' }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tarefa_titulo">Título</InputLabel>
              <Input
                id="tarefa_titulo"
                value={tituloTarefa}
                onChange={(e) => setTituloTarefa(e.target.value)}
              />
              <FormHelperText>Título da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tarefa_descricao">Descrição</InputLabel>
              <Input
                id="tarefa_descricao"
                value={descricaoTarefa}
                onChange={(e) => setDescricaoTarefa(e.target.value)}
              />
              <FormHelperText>Descrição da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Input
                  id="tarefa_inicio"
                  type="date"
                  value={inicioTarefa}
                  onChange={(e) => setInicioTarefa(e.target.value)}
                />
                <FormHelperText>Início da Tarefa</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Input
                  id="tarefa_fim"
                  type="date"
                  value={fimTarefa}
                  onChange={(e) => setFimTarefa(e.target.value)}
                />
                <FormHelperText>Fim da Tarefa</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                <Select
                  id="tarefa_recurso"
                  value={recursoTarefa}
                  onChange={handleRecurso}
                >
                  <MenuItem value="Recurso 1">Recurso 1</MenuItem>
                  <MenuItem value="Recurso 2">Recurso 2</MenuItem>
                  <MenuItem value="Recurso 3">Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_status">Status</InputLabel>
                <Select
                  id="tarefa_status"
                  value={statusTarefa}
                  onChange={handleStatus}
                >
                  <MenuItem value="Aguardando">Aguardando</MenuItem>
                  <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                  <MenuItem value="Concluída">Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {statusTarefa && (
            <Grid item xs={12} mt={2}>
              <LinearProgress
                variant="determinate"
                value={
                  statusTarefa === 'Aguardando'
                    ? 33
                    : statusTarefa === 'Em Andamento'
                    ? 66
                    : 100
                }
              />
              <FormHelperText>
                Progresso da tarefa: {statusTarefa}
              </FormHelperText>
            </Grid>
          )}
          <Grid container spacing={2} mt={3}>
            <Grid item>
              <Tooltip title="Pré-visualizar tarefa">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                  onClick={handlePreview}
                >
                  Pré-visualizar
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Salvar tarefa">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleSalvar}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Limpar formulário">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                >
                  Limpar
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Cancelar">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={previewOpen} onClose={handleClosePreview}>
        <DialogTitle>Pré-visualização da Tarefa</DialogTitle>
        <DialogContent>
          <p>
            <strong>Título:</strong> {tituloTarefa}
          </p>
          <p>
            <strong>Descrição:</strong> {descricaoTarefa}
          </p>
          <p>
            <strong>Início:</strong> {inicioTarefa}
          </p>
          <p>
            <strong>Fim:</strong> {fimTarefa}
          </p>
          <p>
            <strong>Recurso:</strong> {recursoTarefa}
          </p>
          <p>
            <strong>Status:</strong> {statusTarefa}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  p: 4,
};

export default CriarTarefa;
