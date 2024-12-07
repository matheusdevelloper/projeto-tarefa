import React, { useState, useEffect } from "react";
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
  CardActions,
  Button,
} from "@mui/material";

// Componente EditarTarefa
const EditarTarefa = ({
  handleCloseEditar,
  idTarefaSelecionada,
  tarefas,
  tarefa,
  setTarefas,
}) => {
  const [idTarefa, setIdTarefa] = useState(null);
  const [tituloTarefa, setTituloTarefa] = useState("");
  const [descricaoTarefa, setDescricaoTarefa] = useState("");
  const [inicioTarefa, setInicioTarefa] = useState("");
  const [fimTarefa, setFimTarefa] = useState("");
  const [recursoTarefa, setRecursoTarefa] = useState("");
  const [statusTarefa, setStatusTarefa] = useState("");

  const [errors, setErrors] = useState({}); // Para validação

  // Atualizar estados com os dados da tarefa selecionada
  useEffect(() => {
    if (tarefa) {
      setIdTarefa(idTarefaSelecionada);
      setTituloTarefa(tarefa.tituloTarefa || "");
      setDescricaoTarefa(tarefa.descricaoTarefa || "");
      setInicioTarefa(tarefa.inicioTarefa || "");
      setFimTarefa(tarefa.fimTarefa || "");
      setRecursoTarefa(tarefa.recursoTarefa || "");
      setStatusTarefa(tarefa.statusTarefa || "");
    }
  }, [tarefa, idTarefaSelecionada]);

  // Manipulador para salvar a edição
  const handleEditar = () => {
    const newErrors = {};

    // Validação básica
    if (!tituloTarefa.trim()) newErrors.tituloTarefa = "Título é obrigatório.";
    if (!inicioTarefa) newErrors.inicioTarefa = "Data de início é obrigatória.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Atualizar a lista de tarefas
    setTarefas((current) =>
      current.map((obj) =>
        obj.idTarefa === idTarefaSelecionada
          ? {
              ...obj,
              idTarefa: idTarefaSelecionada,
              tituloTarefa,
              descricaoTarefa,
              inicioTarefa,
              fimTarefa,
              recursoTarefa,
              statusTarefa,
            }
          : obj
      )
    );

    // Fechar modal
    handleCloseEditar();
  };

  // Renderização
  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Editar Tarefa" subheader="Edite as informações abaixo" />
        <CardContent sx={{ width: "95%", maxWidth: "100%" }}>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.tituloTarefa)}>
              <Input
                id="tarefa_titulo"
                aria-describedby="tarefa_titulo_helper_text"
                value={tituloTarefa}
                onChange={(e) => setTituloTarefa(e.target.value)}
              />
              <FormHelperText id="tarefa_titulo_helper_text">
                {errors.tituloTarefa || "Título da tarefa."}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                id="tarefa_descricao"
                aria-describedby="tarefa_descricao_helper_text"
                value={descricaoTarefa}
                onChange={(e) => setDescricaoTarefa(e.target.value)}
              />
              <FormHelperText id="tarefa_descricao_helper_text">
                Descrição da tarefa.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <FormControl fullWidth error={Boolean(errors.inicioTarefa)}>
                <Input
                  id="tarefa_inicio"
                  type="date"
                  aria-describedby="tarefa_inicio_helper_text"
                  value={inicioTarefa}
                  onChange={(e) => setInicioTarefa(e.target.value)}
                />
                <FormHelperText id="tarefa_inicio_helper_text">
                  {errors.inicioTarefa || "Início da tarefa."}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <Input
                  id="tarefa_fim"
                  type="date"
                  aria-describedby="tarefa_fim_helper_text"
                  value={fimTarefa}
                  onChange={(e) => setFimTarefa(e.target.value)}
                />
                <FormHelperText id="tarefa_fim_helper_text">
                  Fim da tarefa.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                <Select
                  id="tarefa_recurso"
                  value={recursoTarefa}
                  label="Recurso"
                  onChange={(e) => setRecursoTarefa(e.target.value)}
                >
                  <MenuItem value="Recurso 1">Recurso 1</MenuItem>
                  <MenuItem value="Recurso 2">Recurso 2</MenuItem>
                  <MenuItem value="Recurso 3">Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_status">Status</InputLabel>
                <Select
                  id="tarefa_status"
                  value={statusTarefa}
                  label="Status"
                  onChange={(e) => setStatusTarefa(e.target.value)}
                >
                  <MenuItem value="Aguardando">Aguardando</MenuItem>
                  <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                  <MenuItem value="Concluída">Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} pl={2} mt={2}>
            <Grid item xs={2}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleEditar}
              >
                Salvar
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={handleCloseEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  p: 4,
};

export default EditarTarefa;
