defmodule ProbabilityWeighTingFunction.Actions do
  alias ProbabilityWeighTingFunction.Participant
  alias ProbabilityWeighTingFunction.Host

  def change_page(data, page) do
    action = get_action("change page", page)
    format(data, nil, dispatch_to_all(data, action))
  end

  def join(data, id, participant) do
    host = get_action("join", %{id: id, participant: participant})
    action = get_action("joined", Map.size(data.participants))
    format(data, host, dispatch_to_all(data, action))
  end
  
  def update_host_contents(data) do
    host = get_action("update contents", Host.format_contents(data))
    format(data, host)
  end

  def all_reset(data) do
    host = get_action("update contents", Host.format_contents(data))
    action = get_action("reset", %{
        ansed: false,
        rate: [30, 60, 90],
        question: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5],
        add: %{"0" =>1000, "1" =>1000, "2" =>1000, "3" =>1000, "4" =>1000, "5" =>1000},
        plus: %{"0" =>1000, "1" =>1000, "2" =>1000, "3" =>1000, "4" =>1000, "5" =>1000},
        befor: %{"0" => -1, "1" => -1, "2" => -1, "3" => -1, "4" => -1, "5" => -1},
        down: %{"0" => false, "1" => false, "2" => false, "3" => false, "4" => false, "5" => false},
        state: 0,
        slideIndex: 0,
      }
    )
    format(data, host, dispatch_to_all(data, action))
  end

  def set_question(data,id,question) do
    participant = get_action("set question", question)
    host = get_action("start", %{id: id})
    format(data,host,dispatch_to(id,participant))
  end

  def next(data,id,slideIndex) do
    host = get_action("update_result", %{id: id, add: data.participants[id].add, plus: data.participants[id].plus})
    participant = get_action("change index", %{slideIndex_data: slideIndex , add: data.participants[id].add, plus: data.participants[id].plus})
    format(data, host, dispatch_to(id,participant))
  end

  def finish(data,id) do
    host = get_action("update_result", %{id: id, add: data.participants[id].add, plus: data.participants[id].plus})
    participant = get_action("to_result", %{})
    format(data, host, dispatch_to(id,participant))
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.format_contents(data, id)))
    format(data, nil, participant)
  end

  # Utilities

  defp get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  defp dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  defp dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  defp format(data, host, participants \\ nil) do
    result = %{"data" => data}
    unless is_nil(host) do
      result = Map.put(result, "host", %{action: host})
    end
    unless is_nil(participants) do
      result = Map.put(result, "participant", participants)
    end
    {:ok, result}
  end
end
