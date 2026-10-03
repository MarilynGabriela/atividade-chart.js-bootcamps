var database = require("../database/config");// CARIAVEL PARA REQUISIÇÃO NO config.

function buscarDashboard(idUsuario) {

    //  SELECT PARA BUSCAR OS INDICADORES DA DESHBOARD
    var instrucaoSql = `
    SELECT
       COUNT(fkQuiz) AS respondidos,
       IFNULL(SUM(pontos), 0) AS pontos,
       ROUND((IFNULL(SUM(pontos),0) / 300) * 100,0) AS progresso,
       ROUND(IFNULL(AVG(pontos),0),0) AS media
       FROM pontuacao
    WHERE fkUsuario = ${idUsuario};

    `;// QTDE. QUIZZES, SOMA PTS.TOTAL, CALCULA O RPOCESSO GERAL, E CALCULA A MEDIA DAS PTS.

    return database.executar(instrucaoSql);// EXECUTA NO SQL 
}

function buscarUltimosQuizzes(idUsuario) {

    //SELECT BUSCAR OS ULTIMOS QUIZZES DOUSUARIO NA TABELA PONTUAÇÃO
    var instrucaoSql = `
    SELECT
        q.nomeQuiz,
        p.pontos AS pontuacao,
        p.dataResposta
    FROM pontuacao p
    JOIN quiz q ON p.fkQuiz = q.idQuiz
    WHERE p.fkUsuario = ${idUsuario}
    ORDER BY p.dataResposta DESC
    LIMIT 5;
    `;

    return database.executar(instrucaoSql);
}

function salvarPontuacao(pontos, fkUsuario, fkQuiz) {

    var verificarSql = `
    SELECT idPontucao FROM pontuacao
    WHERE fkUsuario = ${fkUsuario}
    AND fkQuiz = ${fkQuiz};
    `;// VERIFICA SE JA EXISTE UM REGISTRO DESSE USUARIO NESSE QUIZ

    return database.executar(verificarSql)//EXECUTA NO BANCO

        .then(function (resultado) {//SE O EXISTIR RESULTADO O

            if (resultado.length > 0) {

                //ATUALIZA  APONTUAÇÃO ATINGIDA
                var updateSql = `
            UPDATE pontuacao SET
                pontos = ${pontos},
                dataResposta = CURRENT_TIMESTAMP
            WHERE fkUsuario = ${fkUsuario}
            AND fkQuiz = ${fkQuiz};
            `;

                return database.executar(updateSql);

            } else {//SE NÃO EXISTIR RESULTADON, INSERT PARA NOVA PTS.

                var insertSql = `
            INSERT INTO pontuacao (pontos, fkUsuario, fkQuiz)
             VALUES(${pontos}, ${fkUsuario}, ${fkQuiz});
            `;
                return database.executar(insertSql);
            }

        });

}

//EXPORT AS FUNÇÕES PARA CONTROLELERS
module.exports = {
    buscarDashboard,
    buscarUltimosQuizzes,
    salvarPontuacao
};