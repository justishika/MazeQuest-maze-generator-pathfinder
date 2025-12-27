import grpc
import maze_pb2
import maze_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = maze_pb2_grpc.MazeServiceStub(channel)
    response = stub.SolveMaze(
        maze_pb2.MazeRequest(
            maze=[1,0,1,0],
            rows=2,
            cols=2,
            start=0,
            end=3
        )
    )
    print("Path:", response.path)

if __name__ == "__main__":
    run()
