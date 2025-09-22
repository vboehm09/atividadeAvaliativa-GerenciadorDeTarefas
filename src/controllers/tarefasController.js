import dados from "../models/dados.js";
const { gerenciamentoDeTarefas } = dados;

const getAllTarefas = (req, res) => {
    res.status(200).json({
        total: gerenciamentoDeTarefas.length,
        gerenciamentoDeTarefas: gerenciamentoDeTarefas
    })
}

const getById = (req, res) => {
    let id = parseInt(req.params.id);

    const tarefa = gerenciamentoDeTarefas.find(t => t.id === id);

    if (tarefa) {
        res.status(200).json({
            success: true,
            tarefa: tarefa
        })
    }

    res.status(400).json({
        success: false,
        message: "Tarefa nao encontrada"
    })
}

const createTarefa = (req, res) => {
    const { titulo, descricao, prioridade, status, dataVencimento, responsavel, projeto } = req.body;

    const statusLista = ["pendente", "em andamento", "concluida", "concluída", "cancelada"];

    const prioridadeLista = ["baixa", "media", "média", "alta", "urgente"];

    const responsavelLista = ["joao silva", "joão silva", "maria santos", "pedro costa", "ana oliveira", "lucas pereira"];
    
    console.log(titulo)
    console.log(status);
    
    if (!titulo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'titulo' é obrigatório para criar uma tarefa!"
        });
    }

    if (!descricao) {
        return res.status(400).json({
            success: false,
            message: "O campo 'descricao' é obrigatório para criar uma tarefa!"
        });
    }

    if (!prioridade || !prioridadeLista.includes(prioridade.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `O campo 'prioridade' é obrigatório e deve ser uma das opções: ${prioridadeLista.join(", ")}!`
        });
    }

    if (!status || !status.includes(status.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `O campo 'status' é obrigatório e deve ser uma das opções: ${statusLista.join(", ")}!`
        });
    }

    if (!responsavel || !responsavel.includes(responsavel.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `O campo 'responsavel' é obrigatório e deve ser uma das opções: ${responsavelLista.join(", ")}!`
        });
    }

    if (!projeto) {
        return res.status(400).json({
            success: false,
            message: "O campo 'projeto' é obrigatório para criar uma carta!"
        });
    }

    const novaTarefa = {
        id: gerenciamentoDeTarefas.length + 1,
        titulo,
        descricao,
        prioridade: prioridade.toLowerCase(),
        status: status.toLowerCase(),
        responsavel: responsavel.toLowerCase(),
        dataVencimento: new Date(),
        projeto
    }

    gerenciamentoDeTarefas.push(novaTarefa);
    res.status(201).json({
        success: true,
        message: "Tarefa criada com sucesso",
        gerenciamentoDeTarefas: novaTarefa
    })
}

const deleteTarefa = (req, res) => {
    let id = parseInt(req.params.id);
    const tarefaParaRemover = gerenciamentoDeTarefas.find(t => t.id === id);

    if (!tarefaParaRemover) {
        return res.status(404).json({
            success: false,
            message: 'Esta tarefa nao existe'
        })
    }
    const tarefasFiltradas = gerenciamentoDeTarefas.filter(tarefa => tarefa.id !== id);
    gerenciamentoDeTarefas.splice(0, gerenciamentoDeTarefas.length, ...tarefasFiltradas);
    res.status(200).json({
        success: true,
        message: 'Tarefa deletada com sucesso',
        tarefaRemovida: tarefaParaRemover
    })
}

const updateTarefa = (req, res) => {
    const id = parseInt(req.params.id);

    const { titulo, descricao, prioridade, status, dataVencimento, responsavel, projeto } = req.body;

    const statusLista = ["pendente", "em andamento", "concluida", "concluída", "cancelada"];

    const prioridadeLista = ["baixa", "media", "média", "alta", "urgente"];

    const responsavelLista = ["joao silva", "joão silva", "maria santos", "pedro costa", "ana oliveira", "lucas pereira"];

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido"
        })
    }

    const tarefaExiste = gerenciamentoDeTarefas.find(tarefa => tarefa.id === id);

    if (!tarefaExiste) {
        return res.status(400).json({
            success: false,
            message: "A tarefa não existe."
        })
    }

    if(status){
        if (!statusLista.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'status' deve ser uma das opções: ${statusLista.join(", ")}!`
            });
        }
    }

    if(prioridade){
        if (!prioridadeLista.includes(prioridade.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'prioridade' deve ser uma das opções: ${prioridadeLista.join(", ")}!`
            });
        }
    }

    if(responsavel){
        if (!responsavelLista.includes(responsavel.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'responsavel' deve ser uma das opções: ${responsavelLista.join(", ")}!`
            });
        }
    }

    const tarefasAtualizadas = gerenciamentoDeTarefas.map(tarefa => {
        return tarefa.id === id
            ? {
                ...tarefa,
                ...(titulo      && { titulo }),
                ...(descricao    && { descricao }),
                ...(prioridade  && { prioridade }),
                ...(status      && { status }),
                ...(dataVencimento && new Date(dataVencimento) >= new Date() && { dataVencimento }),
                ...(responsavel      && { responsavel }),
                ...(projeto      && { projeto })
            }
            : tarefa;
    });
    
    gerenciamentoDeTarefas.splice(0, gerenciamentoDeTarefas.length, ...tarefasAtualizadas);

    const tarefaNova = gerenciamentoDeTarefas.find(tarefa => tarefa.id === id);

    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso",
        tarefa: tarefaNova
    })

}




export { getAllTarefas, getById, createTarefa, deleteTarefa, updateTarefa };